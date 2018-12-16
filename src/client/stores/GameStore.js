import { action, observable } from 'mobx';

import { FigureTypes } from 'Models/Figure';
import { createBoard } from 'Utils/board';
import { checkXYCollisions, checkDiagonalCollisions } from 'Utils/collisions';

class GameStore {
  @observable board = createBoard();

  @action.bound
  moveFigure(figure, x, y) {
    const [figureX, figureY] = figure.position;

    this.board[figureY][figureX].figure = {};
    this.board[y][x].figure = {
      ...figure,
      position: [x, y],
    };
  }

  canMove = (figure, toX, toY) => {
    const [x, y] = figure.position;
    const dx = toX - x;
    const dy = toY - y;
    const enemyFigure = this.board[toY][toX].figure;
    const canAttack = enemyFigure.color !== figure.color;

    switch (figure.name) {
      case FigureTypes.KNIGHT:
        return (
          canAttack &&
          ((Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
            (Math.abs(dx) === 1 && Math.abs(dy) === 2))
        );

      case FigureTypes.PAWN:
        const moveCheck =
          figure.color === 'white'
            ? (toX === x && dy === -1 && enemyFigure.color !== 'black') ||
              (Math.abs(dx) === 1 && dy === -1 && enemyFigure.color === 'black')
            : (toX === x && dy === 1 && enemyFigure.color !== 'white') ||
              (Math.abs(dx) === 1 && dy === 1 && enemyFigure.color === 'white');

        return canAttack && moveCheck;

      case FigureTypes.ROOK:
        return (
          canAttack &&
          checkXYCollisions(this.board, figure, this.board[toY][toX])
        );

      case FigureTypes.BISHOP:
        return (
          canAttack &&
          checkDiagonalCollisions(this.board, figure, this.board[toY][toX])
        );

      case FigureTypes.QUEEN:
        return (
          canAttack &&
          (checkXYCollisions(this.board, figure, this.board[toY][toX]) ||
            checkDiagonalCollisions(this.board, figure, this.board[toY][toX]))
        );

      case FigureTypes.KING:
        return canAttack && Math.abs(dx) <= 1 && Math.abs(dy) <= 1;

      default:
        return true;
    }
  };
}

export default GameStore;