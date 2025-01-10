import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import { saveAuthToken } from "../../utils/authHelpers";
import "./AuthForm.css";

const apiUrl = process.env.REACT_APP_API_URL;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // New state for success message
  const [isLoading, setIsLoading] = useState(false); // Add isLoading state
  const navigate = useNavigate(); // Add this line


  const handleLogin = async (e) => {
    e.preventDefault();

    // Clear previous error message
    setErrorMessage("");
    setSuccessMessage("");

    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    setIsLoading(true); // Start loading

    try {
      const response = await axios.post(`${apiUrl}/api/auth/login`, { email, password });
      saveAuthToken(response.data.token);
      setSuccessMessage("Login successful! Welcome back."); // Set success message
      console.log("Login successful:", response.data);
      // Redirect to the chatbot page or dashboard
      navigate("/chatbot"); // Add this
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setErrorMessage("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <form onSubmit={handleLogin} className="auth-form">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => { setEmail(e.target.value);
          setErrorMessage(""); // Clear error message
          setSuccessMessage(""); // Clear success message
        }}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setErrorMessage(""); // Clear error message
          setSuccessMessage(""); // Clear success message
        }}
        required
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Logging in..." : "Login"}
      </button>
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

export default Login;
