import _ from 'lodash';
import { observable } from 'mobx';

export default class Figure {
  @observable position;

  constructor(name, color, position) {
    this.id = _.uniqueId(name);
    this.name = name;
    this.color = color;
    this.position = position;
  }
}

export const FigureTypes = [
  'pawn',
  'rook',
  'knight',
  'bishop',
  'queen',
  'king',
];
