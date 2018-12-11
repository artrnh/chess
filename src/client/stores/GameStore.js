import { observable } from 'mobx';

import Figure from 'Models/Figure';

class GameStore {
  @observable board = [
    [
      new Figure('rook', 'black'),
      new Figure('knight', 'black'),
      new Figure('bishop', 'black'),
      new Figure('queen', 'black'),
      new Figure('king', 'black'),
      new Figure('bishop', 'black'),
      new Figure('knight', 'black'),
      new Figure('rook', 'black'),
    ],
    [
      new Figure('pawn', 'black'),
      new Figure('pawn', 'black'),
      new Figure('pawn', 'black'),
      new Figure('pawn', 'black'),
      new Figure('pawn', 'black'),
      new Figure('pawn', 'black'),
      new Figure('pawn', 'black'),
      new Figure('pawn', 'black'),
    ],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [
      new Figure('pawn', 'white'),
      new Figure('pawn', 'white'),
      new Figure('pawn', 'white'),
      new Figure('pawn', 'white'),
      new Figure('pawn', 'white'),
      new Figure('pawn', 'white'),
      new Figure('pawn', 'white'),
      new Figure('pawn', 'white'),
    ],
    [
      new Figure('rook', 'white'),
      new Figure('knight', 'white'),
      new Figure('bishop', 'white'),
      new Figure('queen', 'white'),
      new Figure('king', 'white'),
      new Figure('bishop', 'white'),
      new Figure('knight', 'white'),
      new Figure('rook', 'white'),
    ],
  ];
}

export default GameStore;
