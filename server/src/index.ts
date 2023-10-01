import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import bodyParser from 'body-parser';
// import usersRouter from './routes/users';
import gamesRouter from './routes/games';
import swagger from './swagger';
import swaggerUi from 'swagger-ui-express';

export const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

// app.use('/users', usersRouter);
app.use('/games', gamesRouter);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swagger));
app.get('/docs.json', (_, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swagger);
});

// Listen

const port = 3000;
httpServer.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`API documentation: http://localhost:${port}/docs`);
});
