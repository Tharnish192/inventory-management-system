import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Dashboard() {
  const products = useSelector((state) => state.inventory.products);
  const lowStock = products.filter((item) => Number(item.quantity) < 5);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="card">
        <h2>Total Products</h2>
        <p>{products.length}</p>
      </div>

      <div className="card">
        <h2>⚠ Low Stock Alerts</h2>
        <p>{lowStock.length} items need restocking</p>
      </div>

      <div className="card">
        <h2>⏰ Pending Orders</h2>
        <p>3 pending orders</p>
      </div>

      <Link to="/inventory" className="nav-btn">Inventory</Link>
      <Link to="/reports" className="nav-btn">Reports</Link>
    </div>
  );
}

export default Dashboard;