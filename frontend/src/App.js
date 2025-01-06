import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/auth/HomePage";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import ForgotPassword from "./components/auth/ForgotPassword"; // Import ForgotPassword component
import ResetPassword from "./components/auth/ResetPassword"; // Import ResetPassword component

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Forgot Password Route */}
        <Route path="/reset-password/:token" element={<ResetPassword />} /> {/* Reset Password Route with token */}
      </Routes>
    </Router>
  );
};

export default App;
