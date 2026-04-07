import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ViewerDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { products, sales } = useSelector((state) => state.inventory);

  return (
    <div>
      <div className="flex justify-between align-center mb-4">
        <div>
          <h1>Viewer Dashboard</h1>
          <p>Welcome, {user?.name}. Here is the current system overview.</p>
        </div>
        <Link to="/reports" className="btn btn-outline">
          View Detailed Reports
        </Link>
      </div>

      <div className="dashboard-grid">
        <div className="card stat-card">
          <div className="stat-title">Tracked Items</div>
          <div className="stat-value">{products.length}</div>
        </div>
        <div className="card stat-card">
          <div className="stat-title">Out of Stock</div>
          <div className="stat-value" style={{color: 'var(--danger)'}}>
            {products.filter(p => p.quantity === 0).length}
          </div>
        </div>
        <div className="card stat-card">
          <div className="stat-title">Total Sales Logged</div>
          <div className="stat-value">{sales.length}</div>
        </div>
      </div>

       <div className="dashboard-grid">
        <div className="card" style={{gridColumn: "span 2"}}>
          <h2>Stock Overview</h2>
          <div className="table-container mt-4">
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {products.slice(0, 8).map((product) => (
                  <tr key={product.id}>
                    <td style={{fontWeight: 500}}>{product.name}</td>
                    <td>{product.category}</td>
                    <td>{product.quantity}</td>
                    <td>
                      {product.quantity === 0 ? (
                        <span className="badge badge-danger">Out of Stock</span>
                      ) : product.quantity <= product.threshold ? (
                        <span className="badge badge-warning">Low Stock</span>
                      ) : (
                        <span className="badge badge-success">In Stock</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center mt-4">
            <Link to="/inventory" className="btn btn-outline" style={{fontSize: '0.8rem'}}>View Full Inventory List</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewerDashboard;