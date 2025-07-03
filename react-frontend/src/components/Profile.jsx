import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../pages/Navbar";

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (!user) {
      navigate("/user-login");
    }
  }, [user, navigate]);

  return (
    <>
    <Navbar />
    <div style={styles.container}>
      <h2>User Profile</h2>
      {user ? (
        <div style={styles.profile}>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Joined:</strong>{" "}
            {new Date(user.createdAt).toLocaleDateString()}
          </p>
          <button
            style={styles.button}
            onClick={() => {
              localStorage.removeItem("user");
              navigate("../", { replace: true});
            }}
            >
            Logout
          </button>
        </div>
      ) : (
        <p style={styles.error}>You must be logged in to view this page.</p>
      )}
    </div>
    </>
  );
};

const styles = {
  container: {
    paddingTop: "50px",
    maxWidth: "600px",
    margin: "0 auto",
  },
  profile: {
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    backgroundColor: "#f9f9f9",
  },
  button: {
    padding: "10px 15px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
};

export default Profile;

// This code defines a simple user profile page using React.
// It checks if the user is logged in by looking for user data in localStorage.
// If the user is not logged in, it redirects to the login page.
// The profile displays the user's name, email, and join date, with a logout button.
