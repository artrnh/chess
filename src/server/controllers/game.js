import Game from '../models/game';
import { currentGame } from '../app';
import { getIO } from '../socket';

export const getBoard = (req, res) => {
  Game.findById(currentGame).then(game => res.json(game));
};

export const updateBoard = (req, res) => {
  const { board } = req.body;

  getIO().emit('board', board);

  // TODO: Запилить отложенную запись в базу и обработку ошибок
  Game.findByIdAndUpdate(currentGame, { board }, { new: true }).then(game =>
    res.json(game)
  );
};
