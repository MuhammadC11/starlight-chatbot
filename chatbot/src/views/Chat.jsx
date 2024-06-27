import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Chat.css";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await axios.get("http://localhost:5001/messages");
      const uniqueMessages = filterUniqueMessages(response.data);
      setMessages(uniqueMessages);
    };

    fetchMessages();
  }, []);

  const filterUniqueMessages = (messages) => {
    const seen = new Set();
    return messages.filter((msg) => {
      const text = msg.parts.map((part) => part.text).join("");
      if (seen.has(text)) {
        return false;
      } else {
        seen.add(text);
        return true;
      }
    });
  };

  const sendMessage = async () => {
    const response = await axios.post("http://localhost:5001/chat", {
      message: input,
    });
    const uniqueMessages = filterUniqueMessages(response.data.messages);
    console.log(uniqueMessages);
    setMessages(uniqueMessages);
    setInput("");
  };

  const startNewChat = async () => {
    setMessages([]);
    await axios.post("http://localhost:5001/chat", { message: "" }); // Send a request to the chat endpoint to reset the chat
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.slice(1).map(
          (
            msg,
            index // Start from the second item
          ) => (
            <div key={index} className={`message ${msg.role}`}>
              {msg.parts.map((part, partIndex) => (
                <p key={partIndex}>
                  <strong>{msg.role === "user" ? "You" : "Bot"}:</strong>{" "}
                  {part.text}
                </p>
              ))}
            </div>
          )
        )}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
        <button onClick={startNewChat}>New Chat</button>
      </div>
    </div>
  );
};

export default Chat;
