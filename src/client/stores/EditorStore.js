import {action, observable} from 'mobx';

import {createBoard} from 'Utils/editor';

class EditorStore {
    @observable board = createBoard();

    @action.bound
    moveFigure = (figure, x, y) => {
        const [figureX, figureY] = figure.position;

        this.board[figureY][figureX].figure = {
            position: [],
            moved: false
        };

        this.board[y][x].figure = {
            ...figure,
            position: [x, y],
            moved: true
        };
    };
}

export default EditorStore;
