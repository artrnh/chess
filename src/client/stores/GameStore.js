import { action, observable, runInAction } from 'mobx';
import axios from 'axios';

import Cell from 'Models/Cell';
import Figure, { FigureTypes } from 'Models/Figure';
import {
  checkXYCollisions,
  checkDiagonalCollisions,
  checkPawnCollisions,
  checkKnightCollisions,
  checkKingCollisions,
} from 'Utils/collisions';

class GameStore {
  @observable board = [];

  @action.bound
  async getBoard() {
    const { data } = await axios.get('/api/game/board');

    runInAction(() => {
      this.setBoard(data.board);
    });
  }

  @action.bound
  async putBoard() {
    await axios.put('/api/game/board', { board: this.board });
  }

  @action.bound
  moveFigure(figure, x, y) {
    const [figureX, figureY] = figure.position;

    this.board[figureY][figureX].figure = {
      position: [],
      moved: false,
    };

    this.board[y][x].figure = {
      ...figure,
      position: [x, y],
      moved: true,
    };

    this.putBoard();
  }

  @action.bound
  setBoard(board) {
    this.board = board.map(row =>
      row.map(({ x, y, figure }) => {
        const { id, name, color, position, moved } = figure;
        return new Cell(x, y, new Figure(id, name, color, position, moved));
      })
    );
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
