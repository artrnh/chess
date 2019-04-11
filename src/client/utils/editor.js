import _ from 'lodash';

import {Cell, Figure} from 'Models';

const initialLayout = [
    ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'],
    ['pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn'],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ['pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn'],
    ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook']
];

const whiteRows = [6, 7];

export const createBoard = () =>
    initialLayout.map((row, y) =>
        row.map((name, x) => {
            if (!name) return new Cell(x, y);

            const figure = new Figure(
                _.uniqueId(name),
                name,
                whiteRows.includes(y) ? 'white' : 'black',
                [x, y]
            );

            return new Cell(x, y, figure);
        })
    );
