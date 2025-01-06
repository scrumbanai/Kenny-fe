import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./AuthForm.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter your email address.");
      return;
    }

    setLoading(true);
    try {
      // Send email to backend to initiate the password reset process
      const response = await axios.post("/api/auth/forgot-password", { email });
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
    <form onSubmit={handleForgotPassword} className="auth-form">
      <h2>Forgot Password</h2>
      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      {loading ? <p>Loading...</p> : <button type="submit">Submit</button>}
      <div className="back-home">
        <Link to="/">Back to Homepage</Link>
      </div>
    </form>
  );
};

export default ForgotPassword;
