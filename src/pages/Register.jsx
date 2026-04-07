import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "staff",
  });

  const handleRegister = () => {
    if (!form.name || !form.email || !form.password) {
      return alert("Please fill all fields");
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    users.push({
      id: Date.now(),
      ...form,
    });

    localStorage.setItem("users", JSON.stringify(users));

    alert("User registered successfully ✅");

    navigate("/");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>User Registration</h1>

        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <select
          value={form.role}
          onChange={(e) =>
            setForm({ ...form, role: e.target.value })
          }
        >
          <option value="admin">Administrator</option>
          <option value="staff">Staff</option>
          <option value="viewer">Viewer</option>
        </select>

        <button onClick={handleRegister}>Register User</button>
      </div>
    </div>
  );
}

export default Register;