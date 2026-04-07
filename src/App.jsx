import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
// Admin
import AdminDashboard from "./pages/AdminDashboard";
import UserManagement from "./pages/UserManagement";
// Staff
import StaffDashboard from "./pages/StaffDashboard";
import StockEntry from "./pages/StockEntry";
import Orders from "./pages/Orders";
// Viewer & Shared
import ViewerDashboard from "./pages/ViewerDashboard";
import Inventory from "./pages/Inventory";
import Reports from "./pages/Reports";

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  
  if (!isAuthenticated) return <Navigate to="/" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" replace />;
  
  return children;
};

function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === "/";

  return (
    <div className="dashboard-layout">
      {!hideNavbar && <Navbar />}

      <div className={!hideNavbar ? "dashboard-content container" : ""}>
        <Routes>
          <Route path="/" element={<Login />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute allowedRoles={["admin"]}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/users" element={<ProtectedRoute allowedRoles={["admin"]}><UserManagement /></ProtectedRoute>} />
          
          {/* Staff Routes */}
          <Route path="/staff" element={<ProtectedRoute allowedRoles={["staff"]}><StaffDashboard /></ProtectedRoute>} />
          <Route path="/stock-entry" element={<ProtectedRoute allowedRoles={["staff"]}><StockEntry /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute allowedRoles={["staff"]}><Orders /></ProtectedRoute>} />
          
          {/* Viewer Routes */}
          <Route path="/viewer" element={<ProtectedRoute allowedRoles={["viewer"]}><ViewerDashboard /></ProtectedRoute>} />

          {/* Shared Routes */}
          <Route path="/inventory" element={<ProtectedRoute allowedRoles={["admin", "staff", "viewer"]}><Inventory /></ProtectedRoute>} />
          <Route path="/reports" element={<ProtectedRoute allowedRoles={["admin", "viewer"]}><Reports /></ProtectedRoute>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;