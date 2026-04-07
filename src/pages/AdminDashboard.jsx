import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { products, sales, alerts } = useSelector((state) => state.inventory);

  const lowStockAlerts = alerts.filter(a => a.type === 'warning' || a.type === 'danger');
  const totalStockValue = products.reduce((sum, p) => sum + (p.price * p.quantity), 0);
  const totalSales = sales.reduce((sum, s) => sum + s.total, 0);

  return (
    <div>
      <div className="flex justify-between align-center mb-4">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Welcome back, {user?.name}. Here's what's happening with your inventory today.</p>
        </div>
        <Link to="/inventory" className="btn btn-primary">
          Manage Inventory
        </Link>
      </div>

      <div className="dashboard-grid">
        <div className="card stat-card">
          <div className="stat-title">Total Products</div>
          <div className="stat-value">{products.length}</div>
        </div>
        <div className="card stat-card">
          <div className="stat-title">Inventory Value</div>
          <div className="stat-value">${totalStockValue.toFixed(2)}</div>
        </div>
        <div className="card stat-card">
          <div className="stat-title">Total Sales</div>
          <div className="stat-value">${totalSales.toFixed(2)}</div>
        </div>
        <div className="card stat-card">
          <div className="stat-title">Active Alerts</div>
          <div className="stat-value" style={{color: lowStockAlerts.length > 0 ? 'var(--danger)' : 'var(--secondary)'}}>
            {lowStockAlerts.length}
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card" style={{gridColumn: "span 2"}}>
          <h2>Recent Alerts</h2>
          {alerts.length === 0 ? (
            <p className="text-center mt-4">No active alerts. All stock is sufficient.</p>
          ) : (
            <div className="table-container mt-4">
              <table className="table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Message</th>
                  </tr>
                </thead>
                <tbody>
                  {alerts.slice(0, 5).map((alert) => (
                    <tr key={alert.id}>
                      <td>
                        <span className={`badge badge-${alert.type}`}>
                          {alert.type}
                        </span>
                      </td>
                      <td>{alert.message}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;