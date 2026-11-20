from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_endpoints():
    print("=== Testing WeldCost Backend Endpoints ===")

    # 1. Health check
    res = client.get("/api/health")
    assert res.status_code == 200, f"Health check failed: {res.text}"
    print("[PASS] /api/health:", res.json())

    # 2. Login as Welder
    res = client.post("/api/auth/login", json={"email": "welder@weldcost.com", "password": "welder123"})
    assert res.status_code == 200, f"Welder login failed: {res.text}"
    welder_token = res.json()["access_token"]
    print("[PASS] /api/auth/login (Welder): Authenticated successfully")

    # 3. Login as Admin
    res = client.post("/api/auth/login", json={"email": "admin@weldcost.com", "password": "admin123"})
    assert res.status_code == 200, f"Admin login failed: {res.text}"
    admin_token = res.json()["access_token"]
    print("[PASS] /api/auth/login (Admin): Authenticated successfully")

    # 4. Cost Calculator
    calc_payload = {
        "welding_type": "Arc welding",
        "duration_hours": 3.0,
        "number_of_joints": 10,
        "material_type": "Mild Steel",
        "material_quantity_kg": 15.0,
        "electrode_wire_qty": 14.0,
        "cutting_wheels_used": 2.0,
        "grinding_wheels_used": 1.0,
        "transport_km": 10.0,
        "labour_hours": 3.0
    }
    res = client.post("/api/calculator/calculate", json=calc_payload)
    assert res.status_code == 200, f"Calculator failed: {res.text}"
    calc_data = res.json()
    print(f"[PASS] /api/calculator/calculate: Total Operating Cost = ₹{calc_data['total_operating_cost']}, Recommended = ₹{calc_data['recommended_price']}")

    # 5. Why ₹500 Breakdown
    res = client.get("/api/calculator/why-500?price=500")
    assert res.status_code == 200, f"Why 500 failed: {res.text}"
    why500 = res.json()
    assert len(why500["items"]) == 8, "Expected 8 breakdown items"
    print(f"[PASS] /api/calculator/why-500: {len(why500['items'])} items, Net Profit = ₹{why500['net_profit']}")

    # 6. Tools Catalog
    res = client.get("/api/tools")
    assert res.status_code == 200
    tools = res.json()
    assert len(tools) >= 18, f"Expected 18+ tools, got {len(tools)}"
    print(f"[PASS] /api/tools: {len(tools)} tools loaded")

    # 7. Consumables
    res = client.get("/api/consumables")
    assert res.status_code == 200
    consumables = res.json()
    assert len(consumables) >= 10, f"Expected 10 consumables, got {len(consumables)}"
    print(f"[PASS] /api/consumables: {len(consumables)} consumables loaded")

    # 8. Services
    res = client.get("/api/services")
    assert res.status_code == 200
    services = res.json()
    assert len(services) >= 10, f"Expected 10 services, got {len(services)}"
    print(f"[PASS] /api/services: {len(services)} services loaded")

    # 9. Create Quote
    quote_payload = {
        "customer_name": "Test Customer",
        "customer_email": "test@example.com",
        "customer_phone": "+91 98765 43210",
        "service_name": "Gate Welding & Main Entrance Fabrication",
        "welding_type": "Arc welding",
        "material_type": "Mild Steel",
        "material_quantity_kg": 20.0,
        "number_of_joints": 12,
        "duration_hours": 4.0,
        "labour_hours": 4.0,
        "transport_km": 5.0
    }
    res = client.post("/api/quotes", json=quote_payload, headers={"Authorization": f"Bearer {welder_token}"})
    assert res.status_code == 201, f"Create quote failed: {res.text}"
    new_quote = res.json()
    print(f"[PASS] /api/quotes: Created Quote #{new_quote['quote_number']}, Recommended Price = ₹{new_quote['recommended_price']}")

    # 10. Welder Dashboard
    res = client.get("/api/welder/dashboard", headers={"Authorization": f"Bearer {welder_token}"})
    assert res.status_code == 200, f"Welder dashboard failed: {res.text}"
    dash_data = res.json()
    print(f"[PASS] /api/welder/dashboard: Total Jobs = {dash_data['total_jobs']}, Revenue = ₹{dash_data['total_revenue']}, Profit = ₹{dash_data['estimated_profit']}")

    # 11. Admin Stats
    res = client.get("/api/admin/stats", headers={"Authorization": f"Bearer {admin_token}"})
    assert res.status_code == 200, f"Admin stats failed: {res.text}"
    admin_data = res.json()
    print(f"[PASS] /api/admin/stats: Users = {admin_data['total_users']}, Tools = {admin_data['tools_count']}, Quotes Value = ₹{admin_data['total_quote_value']}")

    print("\n>>> ALL 11 API SUITE TESTS PASSED WITH 100% SUCCESS! <<<")

if __name__ == "__main__":
    test_endpoints()

