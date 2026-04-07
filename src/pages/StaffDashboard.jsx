import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const StaffDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { alerts, products, sales } = useSelector((state) => state.inventory);

  const lowStockAlerts = alerts.filter(a => a.type === 'warning' || a.type === 'danger');
  const itemsToRestock = products.filter(p => p.quantity <= p.threshold).length;
  const recentSales = sales.slice(-5).reverse();

  return (
    <div>
       <div className="flex justify-between align-center mb-4">
        <div>
          <h1>Staff Dashboard</h1>
          <p>Welcome back, {user?.name}. Ready to process some orders?</p>
        </div>
        <div className="flex gap-4">
          <Link to="/stock-entry" className="btn btn-outline">Restock Items</Link>
          <Link to="/orders" className="btn btn-primary">Process Order</Link>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card stat-card">
          <div className="stat-title">To Restock</div>
          <div className="stat-value" style={{color: itemsToRestock > 0 ? 'var(--warning)' : 'var(--secondary)'}}>
            {itemsToRestock}
          </div>
        </div>
        <div className="card stat-card">
          <div className="stat-title">Alerts</div>
          <div className="stat-value" style={{color: lowStockAlerts.length > 0 ? 'var(--danger)' : 'var(--secondary)'}}>
            {lowStockAlerts.length}
          </div>
        </div>
        <div className="card stat-card">
          <div className="stat-title">Recent Sales</div>
          <div className="stat-value">{sales.length > 5 ? '5+' : sales.length}</div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card" style={{gridColumn: "span 2"}}>
          <h2>Recent Sales Activity</h2>
          {recentSales.length === 0 ? (
            <p className="text-center mt-4">No recent sales processed.</p>
          ) : (
            <div className="table-container mt-4">
              <table className="table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentSales.map((sale) => (
                    <tr key={sale.id}>
                      <td style={{fontWeight: 500}}>{sale.productName}</td>
                      <td>{sale.quantity}</td>
                      <td>${sale.total.toFixed(2)}</td>
                      <td>{new Date(sale.date).toLocaleString()}</td>
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

export default StaffDashboard;