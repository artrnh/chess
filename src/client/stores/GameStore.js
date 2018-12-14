import { action, observable, toJS } from 'mobx';

import { createBoard } from 'Utils/board';

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
}

export default GameStore;
