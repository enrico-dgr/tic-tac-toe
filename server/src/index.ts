import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import usersRouter from './routes/users';
import gamesRouter from './routes/games';

const app = express();
const httpServer = createServer(app);

// Socket
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:19006'
  }
});

io.on('connection', (socket: Socket) => {
  console.log('A user connected');

  // Handle custom events from client-side
  socket.on('customEvent', (data) => {
    console.log(data); // Do something with received data
    // You can also emit events back to this specific client using: socket.emit(...)
    // Or broadcast messages to all connected clients using: io.emit(...)
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Routes

app.get('/', (req, res) => {
  // Handle API requests here
});

app.use('/users', usersRouter);
app.use('/games', gamesRouter);

// Listen

httpServer.listen(3000, () => {
  console.log('Server running on port 3000');
});
