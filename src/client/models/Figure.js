import _ from 'lodash';
import { observable } from 'mobx';

export const FigureTypes = {
  PAWN: 'pawn',
  ROOK: 'rook',
  KNIGHT: 'knight',
  BISHOP: 'bishop',
  QUEEN: 'queen',
  KING: 'king',
};

export default class Figure {
  @observable position;

  constructor(name, color, position) {
    this.id = _.uniqueId(name);
    this.name = name;
    this.color = color;
    this.position = position;
  }
}
