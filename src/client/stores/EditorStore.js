import {action, observable} from 'mobx';

import {createBoard} from 'Utils/editor';

class EditorStore {
    @observable board = createBoard();

    @action.bound
    moveFigure = (figure, x, y) => {
        if (!figure.position) {
            this.board[y][x].figure = {
                ...figure,
                position: [x, y]
            };

            return;
        }

        const [figureX, figureY] = figure.position;

        this.board[figureY][figureX].figure = {};

        this.board[y][x].figure = {
            ...figure,
            position: [x, y]
        };
    };

    @action.bound
    deleteFigure = figure => {
        if (!figure.position) return;

        const [figureX, figureY] = figure.position;
        this.board[figureY][figureX].figure = {};
    };
}

export default EditorStore;
