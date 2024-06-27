// src/Chat.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Chat.css"; // Assuming you have Chat.css for styling

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await axios.get("http://localhost:5001/messages");
      setMessages(response.data);
    };

    fetchMessages();
  }, []);

  const sendMessage = async () => {
    const response = await axios.post("http://localhost:5001/chat", {
      message: input,
    });
    setMessages(response.data.messages);
    setInput("");
  };

  return (
    <div className="chat-container">
      <div>
        {messages.map((msg, index) => (
          <div key={index} className="message">
            {msg.user && (
              <p>
                <strong>You:</strong> {msg.user}
              </p>
            )}
            {msg.bot && (
              <p>
                <strong>Bot:</strong> {msg.bot}
              </p>
            )}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
