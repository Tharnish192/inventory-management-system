import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/authSlice";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      dispatch(login({ id: 1, name: "System Admin", role: "admin" }));
      navigate("/admin");
    } else if (username === "staff" && password === "staff") {
      dispatch(login({ id: 2, name: "Store Staff", role: "staff" }));
      navigate("/staff");
    } else if (username === "viewer" && password === "viewer") {
      dispatch(login({ id: 3, name: "Data Viewer", role: "viewer" }));
      navigate("/viewer");
    } else {
      setError("Invalid credentials. Try admin/admin, staff/staff, viewer/viewer");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" style={{margin: "0 auto 1rem"}}>
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          </svg>
          <h1>Welcome Back</h1>
          <p>Inventory Management System</p>
        </div>
        
        <form onSubmit={handleLogin}>
          {error && <div className="badge badge-danger mb-4" style={{display: 'block', textAlign: 'center', padding: '0.5rem'}}>{error}</div>}
          
          <div className="form-group">
            <label className="form-label">Username</label>
            <input 
              type="text" 
              className="form-control" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. admin"
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-control" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          
          <button type="submit" className="btn btn-primary" style={{width: '100%', marginTop: '1rem', padding: '0.75rem'}}>
            Sign In
          </button>
        </form>

        <div style={{marginTop: '2rem', fontSize: '0.875rem', color: 'var(--text-muted)', textAlign: 'center'}}>
          <p>Demo Credentials:</p>
          <div className="flex justify-center gap-4 mt-2">
            <span className="badge badge-primary">admin / admin</span>
            <span className="badge badge-success">staff / staff</span>
            <span className="badge badge-warning">viewer / viewer</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;