import { observable } from 'mobx';

import { createBoard } from 'Utils/board';

class GameStore {
  @observable board = createBoard();
}

export default GameStore;
