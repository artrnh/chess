import _ from 'lodash';

class Cell {
    constructor(x, y, figure = {}) {
        this.x = x;
        this.y = y;
        this.figure = figure;
    }
}

const nonEmptyRows = [0, 1, 6, 7];
const blackRows = [0, 1];
// const whiteRows = [6, 7];
const pawnRows = [1, 6];
const figureLayout = [
    'rook',
    'knight',
    'bishop',
    'queen',
    'king',
    'bishop',
    'knight',
    'rook'
];

export const getCellColor = (x, y) => ((x + y) % 2 ? '#B58763' : '#F0DAB5');
export const getCanDropColor = (x, y) => ((x + y) % 2 ? '#AAA33B' : '#CDD26C');
export const getFigureColor = y => (blackRows.includes(y) ? 'black' : 'white');

export const createBoard = () =>
    Array.from({length: 8}).map((row, y) =>
        Array.from({length: 8}).map((cell, x) => {
            if (!nonEmptyRows.includes(y)) return new Cell(x, y);

            const name = pawnRows.includes(y) ? 'pawn' : figureLayout[x];

            const figure = {
                id: _.uniqueId(name),
                name,
                color: getFigureColor(y),
                position: [x, y],
                moved: false
            };

            return new Cell(x, y, figure);
        })
    );
