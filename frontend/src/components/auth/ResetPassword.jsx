import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./AuthForm.css";

const ResetPassword = () => {
  const { token } = useParams(); // Get the token from the URL params
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      // Send the new password and token to backend
      const response = await axios.post("/api/auth/reset-password", { token, password });
      setMessage(response.data.message); // Success message from backend
      setError(""); // Clear any previous error messages
    } catch (error) {
      setError("Error: " + (error.response?.data || error.message));
      setMessage(""); // Clear any previous success message
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleResetPassword} className="auth-form">
      <h2>Reset Password</h2>
      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}
      <input
        type="password"
        placeholder="Enter new password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Confirm new password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      {loading ? <p>Loading...</p> : <button type="submit">Reset Password</button>}
    </form>
  );
};

export default ResetPassword;
