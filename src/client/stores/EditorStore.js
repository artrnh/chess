import {action, observable} from 'mobx';

import Api from 'Api';

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

    @action.bound
    async createGame(name, userId, rules) {
        const {data} = await Api.gamesList.createGame(
            name,
            userId,
            rules,
            this.board
        );

        return data;
    }
}

export default EditorStore;
