# React Web Socket Chat

A simple real-time chat application built with React (frontend) and Node.js/Express/Socket.IO (backend). This project demonstrates how to use WebSockets for real-time communication between multiple users in different chat rooms.

---

## Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Features](#features)
- [How It Works](#how-it-works)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Code Walkthrough](#code-walkthrough)
  - [Backend (`server/`)](#backend-server)
  - [Frontend (`client/`)](#frontend-client)
- [Customization Ideas](#customization-ideas)
- [Troubleshooting](#troubleshooting)
- [Tech Stack](#tech-stack)

---

## Overview

This project is a simple yet powerful demonstration of real-time communication using WebSockets. Users can join chat rooms and exchange messages instantly. The backend is powered by Node.js, Express, and Socket.IO, while the frontend is built with React and Vite for a fast development experience.

---

## Project Structure

```bash
react-web-socket-chat/
├── client/
├── ├──src/
│     ├── App.jsx
│     ├── App.css
│     ├── main.jsx
│     ├── index.css
│     ├── index.html
├── package.json
└── README.md

├── server/
    |── index.js
    ├── package.json
```

---

## Features

- Real-time messaging using WebSockets (Socket.IO)
- Join specific chat rooms
- Send and receive messages instantly
- Simple and clean UI

---

## How It Works

- **Backend:**

  - Uses Express to serve as the HTTP server.
  - Socket.IO manages WebSocket connections.
  - Users join rooms and send messages, which are broadcast to all users in the same room.

- **Frontend:**
  - React app connects to the backend using `socket.io-client`.
  - Users can join a room, send messages, and see messages from others in real time.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- npm (comes with Node.js)

### Setup & Installation

1. **Clone the Repository**

```sh
  git clone https://github.com/your-username/react-web-socket-chat.git
  cd react-web-socket-chat
```

### Install Dependencies

#### Backend

```sh
cd server
npm install
```

#### Frontend

```sh
cd ../client
npm install
```

### Running the Application

Start the Backend Server

```sh
cd server
npm start
The backend runs on http://localhost:3000
```

Start the Frontend Development Server

```sh
cd ../client
npm run dev
The frontend runs on http://localhost:5174 by default
```

### Code Walkthrough

#### Backend (server)

- index.js
  - Sets up an Express server.
  - Integrates Socket.IO for real-time communication.
  - Handles:
    - join_room: Adds a user to a specific room.
    - send_message: Broadcasts a message to all users in the specified room except the sender.

**_Code Snippet:_**

```sh
// Join a room
socket.on("join_room", (room) => {
  socket.join(room);
});

// Send a message to a room
socket.on("send_message", (data) => {
  socket.to(data.room).emit("receive_message", data);
});
```

#### Frontend (client)

- App.jsx
  - Connects to the backend using socket.io-client.
  - Allows users to:
    - Enter a room number and join a room.
    - Type and send messages to the room.
    - Receive and display messages from the room.

**_Code Snippet:_**

```sh
// Connect to backend
const socket = io.connect("http://localhost:3000");

// Join a room
socket.emit("join_room", room);

// Send a message
socket.emit("send_message", { message, room });

// Receive a message
socket.on("receive_message", (data) => {
  setMessageReceived(data.message);
});
```

### Customization Ideas

- User Authentication: Add login/signup functionality.
- Message History: Store and display previous messages.
- Private Messaging: Allow users to send direct messages.
- Typing Indicators: Show when someone is typing.
- UI Improvements: Add avatars, timestamps, or notifications.

### Troubleshooting

- Port Conflicts: Make sure ports 3000 (backend) and 5174 (frontend) are free.
- CORS Issues: If accessing from a different host, configure CORS in the backend.
- Socket.IO Version Mismatch: Ensure both client and server use compatible Socket.IO versions.

### Tech Stack

- React
- Socket.IO
- Vite
- Express
