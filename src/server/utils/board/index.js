import _ from 'lodash';

import {classic, horde} from './layouts';

class Cell {
    constructor(x, y, figure = {}) {
        this.x = x;
        this.y = y;
        this.figure = figure;
    }
}

const createBoard = (layout, whiteRows) =>
    layout.map((row, y) =>
        row.map((name, x) => {
            if (!name) return new Cell(x, y);

            const figure = {
                id: _.uniqueId(name),
                name,
                color: whiteRows.includes(y) ? 'white' : 'black',
                position: [x, y],
                moved: false
            };

            return new Cell(x, y, figure);
        })
    );

export default rules => {
    switch (rules) {
        case 'Classic':
            return createBoard(classic, [6, 7]);
        case 'Horde':
            return createBoard(horde, [3, 4, 5, 6, 7]);
        default:
            return createBoard(classic, [6, 7]);
    }
};
