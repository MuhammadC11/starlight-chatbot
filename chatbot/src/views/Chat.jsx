// Import React hooks and axios for making HTTP requests
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Chat.css";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  // State hook for storing the current input value
  const [input, setInput] = useState("");

  // Effect hook to fetch messages when the component mounts
  useEffect(() => {
    // Define an asynchronous function to fetch messages
    const fetchMessages = async () => {
      const response = await axios.get("http://localhost:5001/messages"); // Use axios to make a GET request for messages

      const uniqueMessages = filterUniqueMessages(response.data); // Filter the fetched messages to remove duplicates

      setMessages(uniqueMessages); // Update the messages state with the filtered messages
    };

    fetchMessages(); // Call the fetchMessages function when the component mounts
  }, []); // Empty dependency array means this effect runs once on mount

  const filterUniqueMessages = (messages) => {
    const seen = new Set(); // Create a new Set to store unique messages
    return messages.reduce((uniqueMessages, msg) => {
      // Reduce the messages array to a new array of unique messages
      const text = msg.parts.map((part) => part.text).join(""); // Combine the parts of the message into a single string
      const originalSize = seen.size; // Store the size of the set before adding the new message
      seen.add(text);
      // If the size of the set increased, the message is unique
      if (seen.size > originalSize) {
        uniqueMessages.push(msg); // Add the message to the uniqueMessages array
      }
      return uniqueMessages; // Return the updated array of unique messages
    }, []);
  };

  const sendMessage = async () => {
    try {
      // Use axios to make a POST request to send the current input as a message
      const response = await axios.post("http://localhost:5001/chat", {
        message: input,
      });
      // Filter the updated messages to remove duplicates
      const uniqueMessages = filterUniqueMessages(response.data.messages);
      // Log the unique messages to the console (for debugging)
      console.log(uniqueMessages);
      // Update the messages state with the new list of messages
      setMessages(uniqueMessages);
    } catch (error) {
      // Log any errors to the console
      console.error("Failed to send message:", error);
      // Here you could update the UI to show an error message
    } finally {
      // Clear the input field whether the message send was successful or not
      setInput("");
    }
  };

  const startNewChat = async () => {
    // Clear the current messages state to reset the chat
    setMessages([]);
    // Make a POST request to reset the chat on the server side
    await axios.post("http://localhost:5001/chat", { message: "" });
  };

  // Render the chat UI
  return (
    <div className="chat-container">
      <div className="messages">
        {/* Map over the messages state to display each message in the json response skipping the first once since thats the default prompt */}
        {messages.slice(1).map((msg, index) => (
          // Render a div for each message, applying a class based on the message role
          <div key={index} className={`message ${msg.role}`}>
            {/* Prefix the message with "You:" or "Bot:" based on the role, strong just means heavier text (i.e boldened) */}
            <strong>{msg.role === "user" ? "You: " : "Bot: "}</strong>
            {/* Map over the parts of each message to render them */}
            {msg.parts.map((part, partIndex) => (
              // Render each part of the message, using dangerouslySetInnerHTML to insert HTML
              <p
                key={partIndex} // Use the part index as the key for each paragraph
                dangerouslySetInnerHTML={{
                  __html: part.text.replace(/\n/g, "<br>"), // Replace newline characters with HTML line breaks (this is for the \n character in the JSON response)
                }}
              ></p>
            ))}
          </div>
        ))}
      </div>
      <div className="input-container">
        {/* Input field for typing new messages */}
        <input
          type="text" // Set the input type to text
          value={input} // Set the input value to the current input state
          placeholder="Start your chat..." // Placeholder text for the input field
          onChange={(e) => setInput(e.target.value)} // Update the input state when the input value changes
          onKeyDown={(e) => e.key === "Enter" && sendMessage()} // Send the message when the Enter key is pressed
        />
        {/* Button to send the current message */}
        <button onClick={sendMessage}>Send</button>
        {/* Button to start a new chat */}
        <button onClick={startNewChat}>New Chat</button>
      </div>
    </div>
  );
};

// Export the Chat component for use in other parts of the app
export default Chat;
