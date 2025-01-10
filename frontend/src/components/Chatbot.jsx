import React, { useState } from "react";
import axios from "axios";
import { removeAuthToken } from "../../utils/authHelpers";
import { useNavigate } from "react-router-dom";
import "./Chatbot.css";

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  const navigate = useNavigate();

  const handleSend = async () => {
    if (!message) return;
    const userMessage = { sender: "user", text: message };
    setConversation([...conversation, userMessage]);
    setMessage("");

    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const response = await axios.post(
        "/api/chat",
        { message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const botMessage = { sender: "bot", text: response.data.reply };
      setConversation([...conversation, userMessage, botMessage]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      removeAuthToken();
      setConversation([]); // Clear chat history
      navigate("/"); // Redirect to homepage
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {conversation.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
};

export default Chatbot;