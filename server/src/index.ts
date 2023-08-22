import express from "express";
import mysql from "mysql";
import { createServer } from "http";
import { Server, Socket } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

// Configure MySQL connection details
const connection = mysql.createConnection({
  host: "localhost",
  user: "your_username",
  password: "your_password",
  database: "your_database_name"
});

// Connect to MySQL database
connection.connect((err) => {
  if (err) throw err;

  console.log("Connected to MySQL database!");
});

io.on("connection", (socket: Socket) => {
  console.log("A user connected");

  // Handle custom events from client-side
  socket.on("customEvent", (data) => {
    console.log(data); // Do something with received data
    // You can also emit events back to this specific client using: socket.emit(...)
    // Or broadcast messages to all connected clients using: io.emit(...)
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

app.get("/", (req, res) => {
  // Handle API requests here
});

httpServer.listen(3000, () => {
  console.log("Server running on port 3000");
});
