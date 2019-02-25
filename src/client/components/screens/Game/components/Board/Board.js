import React, { Component } from 'react';

import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';

import { Cell, CustomDragLayer } from './components';

import { BoardContainer } from './styled';

@inject('game')
@observer
class Board extends Component {
  static propTypes = {
    game: PropTypes.shape({
      board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)),
      moveFigure: PropTypes.func,
      canMove: PropTypes.func,
    }).isRequired,
    socket: PropTypes.shape({
      emit: PropTypes.func,
      on: PropTypes.func,
    }),
  };

  componentDidMount() {
    const { socket } = this.props;

    if (socket) this.subscribeToSocket(socket);
  }

  subscribeToSocket = socket => {
    const {
      game: { setBoard },
    } = this.props;

    socket.on('moveFigure', board => {
      setBoard(board);
    });
  };

  render() {
    const {
      game: { board, moveFigure, canMove },
      socket,
    } = this.props;

    return (
      <BoardContainer>
        <CustomDragLayer />
        {board.map(row =>
          row.map(({ x, y, figure }) => (
            <Cell
              key={y + x}
              x={x}
              y={y}
              color={(x + y) % 2 ? '#B58763' : '#F0DAB5'}
              canDropColor={(x + y) % 2 ? '#AAA33B' : '#CDD26C'}
              figure={figure}
              moveFigure={moveFigure(socket)}
              canMove={canMove}
            />
          ))
        )}
      </BoardContainer>
    );
  }
}

export default Board;