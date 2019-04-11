import React, {Component} from 'react';

import {inject, observer} from 'mobx-react';
import PropTypes from 'prop-types';

import {CustomDragLayer} from 'Common';
import {Cell} from './components';

import {BoardContainer} from './styled';

@inject('game', 'user')
@observer
class Board extends Component {
    static propTypes = {
        game: PropTypes.shape({
            board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)),
            moveFigure: PropTypes.func,
            canMove: PropTypes.func
        }).isRequired,
        user: PropTypes.shape({
            color: PropTypes.string
        }).isRequired,
        socket: PropTypes.shape({
            emit: PropTypes.func,
            on: PropTypes.func
        })
    };

    componentDidMount() {
        const {socket} = this.props;

        if (socket) this.subscribeToSocket(socket);
    }

    subscribeToSocket = socket => {
        const {
            game: {setBoard, switchTurn}
        } = this.props;

        socket.on('moveFigure', ({board, turn}) => {
            setBoard(board);
            switchTurn(turn);
        });
    };

    render() {
        const {
            game: {board, moveFigure, canMove, turn},
            user: {color},
            socket
        } = this.props;

        return (
            <BoardContainer>
                <CustomDragLayer />
                {board.map(row =>
                    row.map(({x, y, figure}) => (
                        <Cell
                            key={y + x}
                            x={x}
                            y={y}
                            color={(x + y) % 2 ? '#B58763' : '#F0DAB5'}
                            canDropColor={(x + y) % 2 ? '#AAA33B' : '#CDD26C'}
                            figure={figure}
                            moveFigure={moveFigure(socket)}
                            canMove={canMove}
                            turn={turn}
                            userColor={color}
                        />
                    ))
                )}
            </BoardContainer>
        );
    }
}

export default Board;
