import { action, observable } from 'mobx';

import { FigureTypes } from 'Models/Figure';
import { createBoard } from 'Utils/board';
import {
  checkXYCollisions,
  checkDiagonalCollisions,
  checkPawnCollisions,
  checkKnightCollisions,
  checkKingCollisions,
} from 'Utils/collisions';

class GameStore {
  @observable board = createBoard();

  @action.bound
  moveFigure(figure, x, y) {
    const [figureX, figureY] = figure.position;

    this.board[figureY][figureX].figure = {};
    this.board[y][x].figure = {
      ...figure,
      position: [x, y],
      moved: true,
    };
  }

  canMove = (figure, toX, toY) => {
    const enemyFigure = this.board[toY][toX].figure;
    const canAttack = enemyFigure.color !== figure.color;

    switch (figure.name) {
      case FigureTypes.KNIGHT:
        return canAttack && checkKnightCollisions([toX, toY], figure);

      case FigureTypes.PAWN:
        return (
          canAttack && checkPawnCollisions([toX, toY], figure, enemyFigure)
        );

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
        return canAttack && checkKingCollisions([toX, toY], figure);

      default:
        return true;
    }
  };
}

export default GameStore;
