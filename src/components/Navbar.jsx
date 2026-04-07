import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

const Navbar = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { alerts } = useSelector((state) => state.inventory);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const unreadAlerts = alerts.filter(a => !a.read).length;

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="brand">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
          </svg>
          IMS
        </Link>
        <div className="nav-links">
          {isAuthenticated ? (
            <>
              {user?.role === "admin" && (
                <>
                  <Link to="/admin" className="nav-link">Dashboard</Link>
                  <Link to="/inventory" className="nav-link">Inventory</Link>
                  <Link to="/users" className="nav-link">Users</Link>
                  <Link to="/reports" className="nav-link">Reports</Link>
                </>
              )}
              {user?.role === "staff" && (
                <>
                  <Link to="/staff" className="nav-link">Dashboard</Link>
                  <Link to="/inventory" className="nav-link">Inventory</Link>
                  <Link to="/stock-entry" className="nav-link">Stock Entry</Link>
                  <Link to="/orders" className="nav-link">Orders</Link>
                </>
              )}
              {user?.role === "viewer" && (
                <>
                  <Link to="/viewer" className="nav-link">Dashboard</Link>
                  <Link to="/reports" className="nav-link">Reports</Link>
                </>
              )}

              {user?.role === "admin" || user?.role === "staff" ? (
                <div style={{ position: "relative" }}>
                  <span className="nav-link">Alerts</span>
                  {unreadAlerts > 0 && (
                    <span style={{
                      position: 'absolute', top: '-5px', right: '-10px', 
                      background: 'var(--danger)', color: 'white', 
                      borderRadius: '50%', padding: '2px 6px', fontSize: '10px',
                      fontWeight: 'bold'
                    }}>
                      {unreadAlerts}
                    </span>
                  )}
                </div>
              ) : null}

              <button onClick={handleLogout} className="btn btn-outline" style={{ marginLeft: "1rem" }}>
                Logout ({user?.name})
              </button>
            </>
          ) : null}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;