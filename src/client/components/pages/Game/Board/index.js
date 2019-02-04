import React, { Component } from 'react';

import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import openSocket from 'socket.io-client';

import Cell from './Cell';
import CustomDragLayer from './CustomDragLayer';

import { BoardContainer } from './styled';

@withRouter
@inject('game', 'routing')
@observer
class Board extends Component {
  @observable loading = false;

  static propTypes = {
    game: PropTypes.shape({
      board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)),
      moveFigure: PropTypes.func,
      canMove: PropTypes.func,
      initBoard: PropTypes.func,
    }).isRequired,
  };

  async componentDidMount() {
    const {
      game: { initGame, setBoard },
      match: { params },
    } = this.props;

    initGame(params.id);

    // TODO: Вынести всю работу с сокетами
    const url =
      process.env.NODE_ENV === 'development'
        ? `http://localhost:8080/`
        : `https://chess-diploma.herokuapp.com/`;

    console.log(`Socket.IO connected to server: ${url}`);

    const socket = openSocket(url);

    socket.on('board', board => {
      setBoard(board);
    });
  }

  render() {
    const {
      game: { board, moveFigure, canMove },
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
              moveFigure={moveFigure}
              canMove={canMove}
            />
          ))
        )}
      </BoardContainer>
    );
  }
}

export default Board;
