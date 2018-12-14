import { observable } from 'mobx';

export default class Cell {
  @observable x;
  @observable y;
  @observable figure;

  constructor(x, y, color, figure = {}) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.figure = figure;
  }
}
