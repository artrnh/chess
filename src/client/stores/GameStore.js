import {action, observable, runInAction} from 'mobx';

import Api from 'Api';

import {Cell, Figure} from 'Models';
import {FigureTypes} from 'Models/Figure';

import {
    checkXYCollisions,
    checkDiagonalCollisions,
    checkPawnCollisions,
    checkKnightCollisions,
    checkKingCollisions
} from 'Utils/collisions';

class GameStore {
    @observable id = '';

    @observable name = '';

    @observable board = [];

    @observable users = [];

    @observable error = null;

    @action.bound
    async initGame(id) {
        const {data} = await Api.game.getGame(id);

        runInAction(() => {
            this.id = data._id;
            this.name = data.name;
            this.setBoard(data.board);
        });
    }

    @action.bound
    connectUser(userId) {
        if (!this.users.includes(userId)) this.users.push(userId);
    }

    @action.bound
    disconnectUser(userId) {
        const userIndex = this.users.findIndex(user => user === userId);

        if (userIndex !== -1) this.users.splice(userIndex, 1);
    }

    @action.bound
    setError(err) {
        this.error = err;
    }

    @action.bound
    setBoard(board) {
        this.board = board.map(row =>
            row.map(({x, y, figure}) => {
                const {id, name, color, position, moved} = figure;

                return new Cell(
                    x,
                    y,
                    new Figure(id, name, color, position, moved)
                );
            })
        );
    }

    @action.bound
    moveFigure = socket => (figure, x, y) => {
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

        socket.emit('moveFigure', {id: this.id, board: this.board});
    };

    canMove = (figure, toX, toY) => {
        const enemyFigure = this.board[toY][toX].figure;
        const canAttack = enemyFigure.color !== figure.color;

        switch (figure.name) {
            case FigureTypes.KNIGHT:
                return canAttack && checkKnightCollisions([toX, toY], figure);

            case FigureTypes.PAWN:
                return (
                    canAttack &&
                    checkPawnCollisions([toX, toY], figure, enemyFigure)
                );

            case FigureTypes.ROOK:
                return (
                    canAttack &&
                    checkXYCollisions(this.board, figure, this.board[toY][toX])
                );

            case FigureTypes.BISHOP:
                return (
                    canAttack &&
                    checkDiagonalCollisions(
                        this.board,
                        figure,
                        this.board[toY][toX]
                    )
                );

            case FigureTypes.QUEEN:
                return (
                    canAttack &&
                    (checkXYCollisions(
                        this.board,
                        figure,
                        this.board[toY][toX]
                    ) ||
                        checkDiagonalCollisions(
                            this.board,
                            figure,
                            this.board[toY][toX]
                        ))
                );

            case FigureTypes.KING:
                return canAttack && checkKingCollisions([toX, toY], figure);

            default:
                return true;
        }
    };
}

export default GameStore;
