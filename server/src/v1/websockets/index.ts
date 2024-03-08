import { Server } from 'socket.io';
import healthz from './healthz';

const io = new Server({
  perMessageDeflate: false,
  cors: {
    origin: process.env.APP_URL,
  },
});

io.use((socket, next) => {
  // TODO: authorization
  next();
  return;
});

io.on('connect_error', (err) => {
  console.error(err, 'Connection error in workspace');
});

io.on('connection', (socket) => {
  healthz(socket);
});

export { io };
