import _ from 'lodash';

import {Cell} from './models';

const layout = [
    ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'],
    ['pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn'],
    [null, null, null, null, null, null, null, null],
    [null, 'pawn', 'pawn', null, null, 'pawn', 'pawn', null],
    ['pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn'],
    ['pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn'],
    ['pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn'],
    ['pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn']
];

const blackRows = [0, 1];
export const getFigureColor = y => (blackRows.includes(y) ? 'black' : 'white');

const createHordeBoard = () =>
    layout.map((row, y) =>
        row.map((name, x) => {
            if (!name) return new Cell(x, y);

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

export default createHordeBoard;
