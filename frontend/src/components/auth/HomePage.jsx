import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Welcome to Our App</h1>
      <nav>
        <Link to="/login">Login</Link> || <Link to="/signup">Sign Up</Link>
      </nav>
    </div>
  );
};

export default HomePage;
