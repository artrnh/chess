import Game from '../models/game';
import { getIO } from '../socket';
import { createBoard } from '../utils/board';

export const getBoard = (req, res) => {
  const { id } = req.params;
  Game.findById(id).then(game => res.json(game));
};

export const updateGame = (req, res) => {
  const { board, ...rest } = req.body;
  const { id } = req.params;

  getIO().emit('board', board);

  Game.findByIdAndUpdate(id, { board, ...rest }, { new: true }).then(game =>
    res.json(game)
  );
};

export const createGame = (req, res) => {
  const { name } = req.body;
  const game = new Game({ name, board: createBoard() });
  return game.save().then(createdGame => res.status(201).json(createdGame));
};

export const getGames = (req, res) =>
  Game.find().then(games => res.json(games));

export const getGame = (req, res) => {
  const { id } = req.params;
  Game.findById(id).then(game => res.json(game));
};

export const deleteGame = (req, res) => {
  const { id } = req.params;

  Game.findByIdAndDelete(id).then(() =>
    res.json({ message: 'Successfully deleted entry.' })
  );
};
