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
    setMessages(uniqueMessages);
    setInput("");
  };

  const startNewChat = async () => {
    setMessages([]);
    await axios.post("http://localhost:5001/chat", { message: "" });
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            {msg.parts.map((part, partIndex) => (
              <p
                key={partIndex}
                dangerouslySetInnerHTML={{
                  __html: part.text.replace(/\n/g, "<br>"),
                }}
              ></p>
            ))}
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
        <button onClick={startNewChat}>New Chat</button>
      </div>
    </div>
  );
};

export default Chat;
