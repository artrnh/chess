export default class Cell {
  constructor(x, y, color, figure = {}) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.figure = figure;
  }
}
