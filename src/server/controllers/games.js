import Game from '../models/game';
import createBoard from '../utils/board';

export const getGames = (req, res) =>
    Game.find()
        .populate('users')
        .then(games => res.json(games));

export const getGame = (req, res) => {
    const {id} = req.params;

    Game.findById(id).then(game => res.json(game));
};

export const createGame = (req, res) => {
    const {name, rules, userId: creator, board} = req.body;

    const game = new Game({
        name,
        creator,
        rules,
        board: board || createBoard(rules)
    });

    return game.save().then(createdGame => res.status(201).json(createdGame));
};

export const updateGame = (req, res) => {
    const {...updatedData} = req.body;
    const {id} = req.params;

    Game.findByIdAndUpdate(id, {...updatedData}, {new: true}).then(game =>
        res.json(game)
    );
};

export const deleteGame = (req, res) => {
    const {id} = req.params;

    Game.findByIdAndDelete(id).then(() =>
        res.json({message: 'Successfully deleted entry.'})
    );
};
