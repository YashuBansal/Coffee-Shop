import React, { useState } from "react";
import "./FormPanel.css";
import { API_BASE_URL } from "../config";

const AdminLogin = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API_BASE_URL}/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      credentials: "include",
    });

    if (res.ok) {
      try{
        window.location.href = "/admin-dashboard";
      }
      catch (error) {
        setError("Server may be waking up... trying again in 10 seconds.");
        setTimeout(() => {
          window.location.reload();
        }, 10000);
      }
    }
    else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form-outline">
        <h2>Admin Login</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          required
          onChange={handleChange}
          className="form-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleChange}
          className="form-input"
        />
        <button type="submit" className="form-button">
          Login
        </button>
        {error && <p className="form-error">{error}</p>}
      </form>
    </div>
  );
};

export default AdminLogin;
// This code defines a simple admin login page using React.
// It includes a form for entering a username and password, and handles the submission by sending a POST request to the server.
// If the login is successful, it redirects to the admin dashboard; otherwise, it displays an error message.
