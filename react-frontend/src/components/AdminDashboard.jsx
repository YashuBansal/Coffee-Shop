import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";
import { API_BASE_URL } from "../config";

const AdminDashboard = () => {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/messages`, {
        credentials: "include",
      });
      if (res.status === 403) {
        alert("Unauthorized. Please log in.");
        window.location.href = "/admin-login";
        return;
      }
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error("Failed to fetch messages", err);
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;

    const res = await fetch(`${API_BASE_URL}/messages/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await res.json();
    if (data.success) {
      alert("Message deleted");
      fetchMessages(); // Refresh
    } else {
      alert("Delete failed");
    }
  };

  const exportToExcel = async () => {
    const XLSX = await import("xlsx");
    const table = document.getElementById("messageTable");

    const clone = table.cloneNode(true);
    const rows = clone.querySelectorAll("tr");
    rows.forEach((row) => row.deleteCell(-1));

    const workbook = XLSX.utils.table_to_book(clone, { sheet: "Messages" });
    XLSX.writeFile(workbook, "contact-messages.xlsx");
  };

  useEffect(() => {
    fetchMessages();
  }, []);


  const handleLogout = async () => {
    await fetch(`${API_BASE_URL}/logout`, {
      credentials: "include", // important to include session cookie
    });
    window.location.href = "/admin-login";
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📬 Contact Form Submissions</h2>
      <button onClick={exportToExcel}>Export to Excel</button>{" "}
      <button onClick={handleLogout}>Logout</button>
      <table id="messageTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Time</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((msg) => (
            <tr key={msg._id}>
              <td>{msg.name}</td>
              <td>{msg.email}</td>
              <td>{msg.message}</td>
              <td>{new Date(msg.createdAt).toLocaleString()}</td>
              <td>
                <button onClick={() => deleteMessage(msg._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
