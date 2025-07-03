import React, { useState } from "react";
import { API_BASE_URL } from "../config";

const ForgotPassword = () => {
  const[email, setEmail] = useState("");
  const[message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const res = await fetch(`${API_BASE_URL}/pass/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage(data.message);
    } else {
      setError(data.message || "An error occurred");
    }
  };

  return (
    <div style={styles.container}>
        <form onSubmit={handleSubmit} style={styles.form}>
            <h2>Forgot Password</h2>
            <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
            />
            <button type="submit" style={styles.button}>Send Reset Link</button>
            {message && <p style={{ color: "green", marginTop: "10px" }}>{message}</p>}
            {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        </form>
    </div>
    );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontFamily: "Arial",
  },
  form: {
    width: "300px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
  },
  button: {
    width: "100%",
    padding: "10px",
  },
};

export default ForgotPassword;