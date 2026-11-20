"""
WeldCost Calculation Engine
Implements authentic industrial welding cost transparency mathematics.
Calculates: Material, Consumables, Machine Depreciation, Electricity, Labour, Transport, Overheads, and Profit.
"""

from typing import Dict, Any

# Material default price per kg (₹ INR)
MATERIAL_RATES = {
    "Mild Steel": 75.0,
    "Stainless Steel (SS 304)": 280.0,
    "Stainless Steel (SS 316)": 390.0,
    "Aluminum (6061)": 320.0,
    "Cast Iron": 110.0,
    "Galvanized Iron (GI)": 88.0,
    "Wrought Iron": 95.0,
    "Customer Provided": 0.0,
}

# Machine power ratings (kW) by welding process
WELDING_POWER_KW = {
    "Arc welding": 4.5,       # MMA Inverter ~200A
    "MIG welding": 5.5,       # MIG/MAG ~250A
    "TIG welding": 3.8,       # TIG DC/AC ~200A
    "Gas welding": 0.0,       # Oxy-acetylene (negligible electric power, primarily gas)
}

# Default consumables pricing (₹ INR)
DEFAULT_RATES = {
    "electricity_per_kwh": 9.5,            # Commercial industrial tariff in India
    "electrode_piece": 12.0,              # E6013 / E7018 per rod
    "mig_wire_per_kg": 180.0,             # ER70S-6
    "argon_gas_per_liter": 2.2,           # Industrial Argon
    "co2_gas_per_kg": 45.0,               # Shielding CO2
    "cutting_wheel_piece": 35.0,          # 4-inch thin cutting wheel
    "grinding_wheel_piece": 55.0,         # 4-inch grinding wheel
    "labour_rate_per_hour": 250.0,        # Skilled welder labour
    "transport_per_km": 16.0,             # Two-way transport & tooling carriage
    "machine_purchase_cost": 25000.0,     # Typical 200A IGBT Inverter
    "machine_lifespan_hours": 4000.0,     # Expected working life
    "annual_maintenance": 3000.0,         # Annual servicing, torch leads, tips
    "safety_overhead_per_hour": 15.0,     # Shield lenses, gloves, boots amortized
    "shop_overhead_percent": 6.0,         # Shop rent, lighting, tool wear buffer
    "profit_margin_percent": 22.0,        # Standard trade margin
}

class CostEngine:

    @staticmethod
    def calculate_welding_cost(
        welding_type: str = "Arc welding",
        duration_hours: float = 2.0,
        number_of_joints: int = 6,
        material_type: str = "Mild Steel",
        material_quantity_kg: float = 5.0,
        electrode_wire_qty: float = 6.0,      # Pieces of rods OR kg of wire
        gas_usage_litres: float = 0.0,        # Litres or kg
        electricity_kwh_override: float = None,
        cutting_wheels_used: float = 1.0,
        grinding_wheels_used: float = 1.0,
        transport_km: float = 5.0,
        labour_hours: float = 2.0,
        labour_rate_per_hour: float = 250.0,
        electricity_rate_per_kwh: float = 9.5,
        machine_purchase_cost: float = 25000.0,
        machine_lifespan_hours: float = 4000.0,
        transport_rate_per_km: float = 16.0,
        profit_margin_percent: float = 22.0,
    ) -> Dict[str, Any]:
        """
        Executes complete multi-variable cost transparency calculation.
        """
        # 1. Material Cost
        unit_mat_price = MATERIAL_RATES.get(material_type, 75.0)
        material_cost = round(material_quantity_kg * unit_mat_price, 2)

        # 2. Electrode / Wire Cost
        if "MIG" in welding_type:
            # electrode_wire_qty represents kg of MIG wire
            electrode_wire_cost = round(electrode_wire_qty * DEFAULT_RATES["mig_wire_per_kg"], 2)
            electrode_desc = f"{electrode_wire_qty:.1f} kg MIG wire @ ₹{DEFAULT_RATES['mig_wire_per_kg']}/kg"
        else:
            # electrode_wire_qty represents number of electrode rods
            electrode_wire_cost = round(electrode_wire_qty * DEFAULT_RATES["electrode_piece"], 2)
            electrode_desc = f"{int(electrode_wire_qty)} electrode rods @ ₹{DEFAULT_RATES['electrode_piece']}/piece"

        # 3. Gas Cost
        if "TIG" in welding_type:
            # Argon usage
            gas_cost = round(gas_usage_litres * DEFAULT_RATES["argon_gas_per_liter"], 2)
            gas_desc = f"{gas_usage_litres:.1f} L Argon shielding gas @ ₹{DEFAULT_RATES['argon_gas_per_liter']}/L"
        elif "MIG" in welding_type:
            # CO2 or mixed gas
            gas_cost = round(gas_usage_litres * DEFAULT_RATES["co2_gas_per_kg"], 2)
            gas_desc = f"{gas_usage_litres:.1f} kg CO2 shielding gas @ ₹{DEFAULT_RATES['co2_gas_per_kg']}/kg"
        elif "Gas welding" in welding_type:
            # Oxy-acetylene set charge
            gas_cost = round(duration_hours * 140.0, 2)
            gas_desc = f"Oxy-Acetylene gas consumption ({duration_hours} hrs @ ₹140/hr)"
        else:
            gas_cost = 0.0
            gas_desc = "Not applicable for manual Arc / Stick welding"

        # 4. Grinding & Cutting Wheels
        cutting_cost = round(cutting_wheels_used * DEFAULT_RATES["cutting_wheel_piece"], 2)
        grinding_cost = round(grinding_wheels_used * DEFAULT_RATES["grinding_wheel_piece"], 2)
        grinding_cutting_cost = round(cutting_cost + grinding_cost, 2)

        # 5. Electricity Consumption & Cost
        # Power Consumption (kW) × Usage Hours × Electricity Rate
        power_kw = WELDING_POWER_KW.get(welding_type, 4.5)
        # Duty cycle adjustment: Welder arcs ~45-60% of total job duration
        effective_arc_hours = duration_hours * 0.55
        calculated_kwh = round(power_kw * effective_arc_hours, 2)
        kwh_to_use = electricity_kwh_override if electricity_kwh_override is not None else calculated_kwh
        electricity_cost = round(kwh_to_use * electricity_rate_per_kwh, 2)

        # 6. Machine Usage & Depreciation
        # Machine Cost Per Hour = Machine Purchase Cost / Expected Working Hours + Wear/Service buffer
        machine_deprec_per_hr = machine_purchase_cost / max(machine_lifespan_hours, 1000.0)
        machine_maintenance_per_hr = DEFAULT_RATES["annual_maintenance"] / 1500.0 # ~1500 working hrs/year
        total_machine_rate_hr = machine_deprec_per_hr + machine_maintenance_per_hr
        machine_usage_cost = round(total_machine_rate_hr * duration_hours, 2)

        # 7. Labour Cost
        # Labour Hours × Labour Rate
        labour_cost = round(labour_hours * labour_rate_per_hour, 2)

        # 8. Transportation Cost
        # Distance (km) × Cost Per KM
        transport_cost = round(transport_km * transport_rate_per_km, 2)

        # 9. Other Expenses (Safety gear wear, workshop rent, welding flux/brush, clamps wear)
        safety_wear_cost = round(duration_hours * DEFAULT_RATES["safety_overhead_per_hour"], 2)
        shop_buffer = round((material_cost + labour_cost) * (DEFAULT_RATES["shop_overhead_percent"] / 100.0), 2)
        other_expenses_cost = round(safety_wear_cost + shop_buffer, 2)

        # Total Operating Cost
        total_operating_cost = round(
            material_cost +
            electrode_wire_cost +
            electricity_cost +
            gas_cost +
            grinding_cutting_cost +
            machine_usage_cost +
            labour_cost +
            transport_cost +
            other_expenses_cost,
            2
        )

        # Recommended Customer Price = Total Operating Cost + Profit Margin
        profit_margin_amount = round(total_operating_cost * (profit_margin_percent / 100.0), 2)
        recommended_price = round(total_operating_cost + profit_margin_amount, 2)

        # Cost breakdown percentage for visual analytics
        def pct(val):
            return round((val / max(recommended_price, 1.0)) * 100, 1)

        breakdown_percentages = {
            "material": pct(material_cost),
            "electrode_wire": pct(electrode_wire_cost),
            "electricity": pct(electricity_cost),
            "gas": pct(gas_cost),
            "grinding_cutting": pct(grinding_cutting_cost),
            "machine_usage": pct(machine_usage_cost),
            "labour": pct(labour_cost),
            "transport": pct(transport_cost),
            "other_expenses": pct(other_expenses_cost),
            "profit_margin": pct(profit_margin_amount),
        }

        # Step by step transparency explanations
        explanations = {
            "material": f"{material_quantity_kg} kg {material_type} at ₹{unit_mat_price}/kg",
            "electrode_wire": electrode_desc,
            "electricity": f"{power_kw} kW machine × {effective_arc_hours:.1f} effective arc hrs = {kwh_to_use:.1f} kWh @ ₹{electricity_rate_per_kwh}/kWh",
            "gas": gas_desc,
            "grinding_cutting": f"{cutting_wheels_used} cut disc (₹{cutting_cost}) + {grinding_wheels_used} grind disc (₹{grinding_cost})",
            "machine_usage": f"Machine asset depreciation (₹{machine_purchase_cost:.0f}/{machine_lifespan_hours:.0f}hrs = ₹{machine_deprec_per_hr:.1f}/hr) + maintenance (₹{machine_maintenance_per_hr:.1f}/hr) × {duration_hours} hrs",
            "labour": f"{labour_hours} welder hours @ ₹{labour_rate_per_hour}/hr",
            "transport": f"{transport_km} km tooling transport @ ₹{transport_rate_per_km}/km",
            "other_expenses": f"Safety PPE wear (₹{safety_wear_cost}) + workshop consumables/handling buffer (₹{shop_buffer})",
            "profit_margin": f"Fair trade operating margin ({profit_margin_percent}%) to sustain workshop tools and reinvest in equipment",
        }

        return {
            "material_cost": material_cost,
            "electrode_wire_cost": electrode_wire_cost,
            "electricity_cost": electricity_cost,
            "gas_cost": gas_cost,
            "grinding_cutting_cost": grinding_cutting_cost,
            "machine_usage_cost": machine_usage_cost,
            "labour_cost": labour_cost,
            "transport_cost": transport_cost,
            "other_expenses_cost": other_expenses_cost,
            "total_operating_cost": total_operating_cost,
            "profit_margin_amount": profit_margin_amount,
            "recommended_price": recommended_price,
            "breakdown_percentages": breakdown_percentages,
            "explanations": explanations,
            "disclaimer": "Prices are estimates calculated from current raw materials and equipment benchmarks. Final quotations may vary according to local market rates, design complexity, metal gauge, and artisan experience."
        }

    @staticmethod
    def get_why_500_breakdown(customer_price: float = 500.0) -> Dict[str, Any]:
        """
        Special Feature: "Why ₹500?" (or any custom price)
        Breaks down exactly where the customer's money goes to debunk the misconception
        that the entire amount goes into the welder's pocket.
        """
        # Baseline standard job proportions calibrated from real fabrication workshops:
        # For a ₹500 small repair/welding job:
        # Labour: 40% (₹200)
        # Electricity: 8% (₹40)
        # Electrode: 12% (₹60)
        # Grinding wheel: 6% (₹30)
        # Machine usage: 10% (₹50)
        # Transportation: 8% (₹40)
        # Other expenses: 4% (₹20)
        # Profit / business savings: 12% (₹60)

        price = max(float(customer_price), 50.0)

        labour = round(price * 0.40, 2)
        electricity = round(price * 0.08, 2)
        electrode = round(price * 0.12, 2)
        grinding_wheel = round(price * 0.06, 2)
        machine_usage = round(price * 0.10, 2)
        transportation = round(price * 0.08, 2)
        other_expenses = round(price * 0.04, 2)
        profit = round(price - (labour + electricity + electrode + grinding_wheel + machine_usage + transportation + other_expenses), 2)

        items = [
            {
                "item": "Welder Labour",
                "amount": labour,
                "percentage": 40.0,
                "color": "#ff6b00",
                "icon": "Hammer",
                "reality": "Payment for physical time, high-heat exposure, specialized eye-hand skill, and prep work."
            },
            {
                "item": "Welding Electrodes",
                "amount": electrode,
                "percentage": 12.0,
                "color": "#f59e0b",
                "icon": "Zap",
                "reality": "Consumable filler rods physically melted into the steel joints to fuse the pieces together."
            },
            {
                "item": "Welding Machine Usage",
                "amount": machine_usage,
                "percentage": 10.0,
                "color": "#3b82f6",
                "icon": "Cpu",
                "reality": "Recovers the ₹20,000–₹40,000 investment for the inverter machine and annual maintenance."
            },
            {
                "item": "Electricity Consumption",
                "amount": electricity,
                "percentage": 8.0,
                "color": "#eab308",
                "icon": "BatteryCharging",
                "reality": "High commercial tariff power drawn by the 200A electric arc at 3000°C temperatures."
            },
            {
                "item": "Transportation",
                "amount": transportation,
                "percentage": 8.0,
                "color": "#10b981",
                "icon": "Truck",
                "reality": "Fuel and vehicle maintenance to carry heavy machine, cables, clamps, and gear to your site."
            },
            {
                "item": "Grinding & Cutting Wheels",
                "amount": grinding_wheel,
                "percentage": 6.0,
                "color": "#8b5cf6",
                "icon": "Disc",
                "reality": "Abrasive wheels wear down and shrink during beveling, slag removal, and smooth finishing."
            },
            {
                "item": "Other Expenses & Safety",
                "amount": other_expenses,
                "percentage": 4.0,
                "color": "#ec4899",
                "icon": "ShieldCheck",
                "reality": "Dark filter lenses, leather gloves, chipping brushes, anti-spatter spray, and shop overhead."
            },
            {
                "item": "Net Workshop Profit",
                "amount": profit,
                "percentage": 12.0,
                "color": "#14b8a6",
                "icon": "TrendingUp",
                "reality": "The actual net amount the welder keeps to sustain their family, workshop, and business."
            }
        ]

        total_costs = round(price - profit, 2)

        return {
            "customer_price": price,
            "items": items,
            "total_operating_cost": total_costs,
            "net_profit": profit,
            "takeaway_message": f"Out of ₹{price:,.0f}, ₹{total_costs:,.0f} ({(total_costs/price)*100:.0f}%) goes directly towards tools, electricity, wear-and-tear, consumables, and transport. Only ₹{profit:,.0f} ({(profit/price)*100:.0f}%) is retained net profit!"
        }

