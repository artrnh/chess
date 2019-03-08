import {observable} from 'mobx';

export default class Cell {
    @observable figure;

    constructor(x, y, figure = {}) {
        this.x = x;
        this.y = y;
        this.figure = figure;
    }
}
