import socketIO from 'socket.io';

let io;

export const socketInit = server => {
  io = socketIO(server);
  return io;
};

export const getIO = () => {
  if (!io) throw new Error('Socket.IO is not initialized!');
  return io;
};
