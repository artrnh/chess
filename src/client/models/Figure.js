import {observable} from 'mobx';

export const FigureTypes = {
    PAWN: 'pawn',
    ROOK: 'rook',
    KNIGHT: 'knight',
    BISHOP: 'bishop',
    QUEEN: 'queen',
    KING: 'king'
};

export default class Figure {
    @observable position;

    constructor(id, name, color, position, moved = false) {
        this.id = id;
        this.name = name;
        this.color = color;
        this.position = position;
        this.moved = moved;
    }
}
