import Game from './models/game';
import User from './models/user';

const socketSetup = io => {
    io.on('connection', socket => {
        socket.on('joinGame', ({userId, gameId}) => {
            Game.findById(gameId)
                .then(game => {
                    if (game.users.length < 2 && !game.users.includes(userId)) {
                        game.users = [...game.users, userId];
                        game.save();

                        return User.findById(userId);
                    }

                    throw new Error('Game already started.');
                })
                .then(user => {
                    user.game = gameId;
                    user.save();

                    io.emit('joinGame', {userId, gameId});
                })
                .catch(err => {
                    io.emit('joinGameFailed', {message: err.message});
                });
        });

        socket.on('leaveGame', ({userId, gameId}) => {
            Game.findById(gameId)
                .then(game => {
                    const userIndex = game.users.findIndex(
                        user => user === userId
                    );
                    game.users.splice(userIndex, 1);
                    game.save();

                    return User.findById(userId);
                })
                .then(user => {
                    user.game = undefined;
                    user.save();

                    io.emit('leaveGame', {userId, gameId});
                });
        });

        socket.on('moveFigure', ({id, board}) => {
            Game.findByIdAndUpdate(id, {board}, {new: true}).then(game => {
                io.emit('moveFigure', game.board);
            });
        });
    });
};

export default socketSetup;
