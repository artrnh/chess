import Game from './models/game';

const socketSetup = io => {
  io.on('connection', socket => {
    socket.on('moveFigure', ({ id, board }) => {
      Game.findByIdAndUpdate(id, { board }, { new: true }).then(game => {
        io.emit('moveFigure', game.board);
      });
    });
  });
};

export default socketSetup;
