import { useState, useEffect } from "react";
import io from "socket.io-client";
import "./App.css";

//connection to back-end server
const socket = io.connect("http://localhost:3000");

function App() {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const [room, setRoom] = useState("");

  /**
   * The `sendMessage` function sends a message to a chat room using a socket connection and clears the
   * input field afterwards.
   */
  const sendMessage = () => {
    if (message.trim()) {
      // socket.emit("send_message", { message }); // send the data to BE (chat between 2 people)
      socket.emit("send_message", { message, room }); // chat in multiple room
      setMessage(""); // Clear the input after sending
    }
  };

  /**
   * The `joinRoom` function emits a "join_room" event with the room parameter via a socket connection
   * if the room is not empty.
   */
  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  /* It is used to set up a subscription to the "receive_message" event emitted by the 
  backend server via the socket connection. */
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, []);

  return (
    <div className="main">
      <input
        type="text"
        value={room}
        placeholder="Enter the room Number"
        onChange={(e) => setRoom(e.target.value)}
      />
      <button onClick={joinRoom}>Join Room</button>
      <input
        type="text"
        value={message}
        placeholder="type message..."
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send Message</button>
      <h3 className="message">Message: {messageReceived}</h3>
    </div>
  );
}

export default App;
