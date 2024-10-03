import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const port = 3000;

/* This code snippet is creating a new instance of the Socket.IO server and configuring it to handle
Cross-Origin Resource Sharing (CORS) for communication between the server and a front-end
application running on "http://localhost:5174". */
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5174",
    methods: ["GET", "POST"],
  },
});

/* It is handling the functionality related to users joining specific chat
rooms and sending/receiving messages within those rooms using Socket.IO. */
io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
});

/* This is handling the functionality of broadcasting a message to all connected sockets except the
 socket that originally sent the message, enabling one-to-many communication.*/
// io.on("connection", (socket) => {
//   socket.on("send_message", (data) => {
//     socket.broadcast.emit("receive_message", data);
//   });
// });

/* code snippet is starting the server on the specified port (in this case, port 3000) and logging a
message to the console indicating that the server is running and accessible at
`http://localhost:3000`. */
server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
