import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { saveAuthToken } from "../../utils/authHelpers";
import "./AuthForm.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // New state for success message


  const handleSignup = async (e) => {
    e.preventDefault();

    // Clear previous error message
    setErrorMessage("");
    setSuccessMessage("");

    if (!email || !password || !confirmPassword) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("/api/auth/signup", { email, password });
      saveAuthToken(response.data.token);
      setSuccessMessage("Signup successful! Welcome to the platform."); // Set success message
      console.log("Signup successful:", response.data);
      // Redirect to dashboard or other protected page here
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      setErrorMessage("Signup failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSignup} className="auth-form">
      <h2>Signup</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <button type="submit">Signup</button>
      {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Display error message */}
      {successMessage && <div className="success-message">{successMessage}</div>} {/* Display success message */}
      <div className="forgot-password">
        <Link to="/forgot-password">Forgot Password?</Link>
      </div>
      <div className="back-home">
        <Link to="/">Back to Homepage</Link>
      </div>
    </form>
  );
};

export default Signup;
