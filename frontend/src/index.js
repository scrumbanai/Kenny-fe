import React from "react";
import ReactDOM from "react-dom/client";  // Use 'react-dom/client' for React 18
import App from "./App";
import "./styles/global.css"; // Import global styles

// Create root and render the App component
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
