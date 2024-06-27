# Simple AI-Powered Chatbot

## Project Overview

### Title: 
AI-Powered Chatbot for Landmarks

### Description:
This project is a basic web application featuring a chatbot capable of answering generic questions about famous landmarks using the Gemini API. The goal is to provide users with information on various landmarks through an intuitive chat interface.

### Time Commitment:
3-4 hours

## What It Looks Like Under The Hood

### Frontend:
- Built using Vite templating for React
- Provides a basic chat interface for users to type questions.
- Displays chatbot responses in a conversational format.

### Backend:
- Implemented using Node.js and Express.
- Utilizes Google Generative AI API for the chatbot functionality.
- Stores chat history in memory.
- Provides endpoints to handle chat messages and reset the chat history.

### Functionality:
- Answers questions about famous landmarks, including:
  - Basic facts (e.g., "Where is the Eiffel Tower located?")
  - Historical significance (e.g., "Why is the Great Wall of China famous?")
  - Visitor information (e.g., "What are the visiting hours for the Statue of Liberty?")
  - Trivia (e.g., "How tall is the Burj Khalifa?")
  - Only answers questions about landmarks and places
  - Follow up questions are allowed


### Tools:
- Frontend: React
- Backend: Node.js and Express
- API: Google Generative AI API
- Version Control: GitHub

## Getting Started

### Prerequisites
- Node.js version 21 at least
- npm (Node Package Manager)

### Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/MuhammadC11/starlight-chatbot

2. Clone the repository:
   ```sh
   cd chatbot
   npm i
   npm run dev

## Approach and Challenges Faced
The first thing I did was create a vite project to use React JavaScript. After that I made a simple input and submit button for the chat interface. After that I had to start building out the basic framework for where the messages will show up. I stopped there and started working on the backend to actually call the API before I could do anything else. After that I did a test run to check if the response was going through but I kept getting errors saying that my API key wasn't valid but it was due to my .env file being spelled incorrectly so that was frustrating. Once I fixed the error, I then ran into the messages not showing up on the screen but "You:" and "Bot:" would show up like it was working so I did a simple console.log to check what the json object looked like. I was trying to display the messages array incorrectly, so I created a map function to iterate over the messages array and display it depending on the role of the message. I ran into the issue of duplicate messages being sent in the messages array and I was stumped so I asked ChatGpt to help me figure out a solution to filtering out the duplicate messages and got that working. I realized the default prompt I was sending was also showing up so I just ended up splicing the array to start at index 1 instead of index 0 and that got rid of that. The hard part was in the backend, you can read my approach in the ReadMe file in that repository. https://github.com/MuhammadC11/starlight-chatbot-backend
