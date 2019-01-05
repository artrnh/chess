import React, { Component } from 'react';

import { observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import openSocket from 'socket.io-client';
import styled from 'styled-components';

import Cell from './Cell';
import CustomDragLayer from './CustomDragLayer';

@inject('game')
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
      game: { getBoard, setBoard },
    } = this.props;

    getBoard();

    console.log(process.env.NODE_ENV);

    const socket = openSocket(
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:8080/'
        : 'https://chess.now.sh:8080/'
    );

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

const BoardContainer = styled.div`
  width: 512px;
  height: 512px;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
`;

export default Board;
