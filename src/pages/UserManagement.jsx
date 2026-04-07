import { useState } from "react";

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "System Admin", username: "admin", role: "admin", active: true },
    { id: 2, name: "Store Staff", username: "staff", role: "staff", active: true },
    { id: 3, name: "Data Viewer", username: "viewer", role: "viewer", active: true }
  ]);

  const toggleUserStatus = (id) => {
    setUsers(users.map(u => u.id === id ? { ...u, active: !u.active } : u));
  };

  return (
    <div>
      <div className="flex justify-between align-center mb-4">
        <div>
          <h1>User Management</h1>
          <p>Register new users and manage system access roles.</p>
        </div>
        <button className="btn btn-primary">
          Register User
        </button>
      </div>

      <div className="card mb-4" style={{borderLeft: '4px solid var(--primary)'}}>
        <p><strong>Note:</strong> User management is currently simulated for frontend demonstration. Register functionality would require backend integration to store hashed credentials securely.</p>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Username</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td style={{fontFamily: 'var(--mono)', fontSize: '0.8rem'}}>#{u.id}</td>
                <td style={{fontWeight: 500}}>{u.name}</td>
                <td>@{u.username}</td>
                <td>
                  <span className={`badge badge-${u.role === 'admin' ? 'primary' : u.role === 'staff' ? 'success' : 'warning'}`}>
                    {u.role.toUpperCase()}
                  </span>
                </td>
                <td>
                  {u.active ? 
                    <span className="badge badge-success">Active</span> : 
                    <span className="badge badge-danger">Disabled</span>
                  }
                </td>
                <td>
                  <button 
                    className={`btn btn-outline ${u.active ? 'btn-danger' : 'btn-success'}`} 
                    style={{padding: '0.25rem 0.5rem'}}
                    onClick={() => toggleUserStatus(u.id)}
                    disabled={u.id === 1} // Can't disable master admin
                  >
                    {u.active ? 'Disable' : 'Enable'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
