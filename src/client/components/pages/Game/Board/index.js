import React, { Component } from 'react';

import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

import Cell from './Cell';

@inject('game')
@observer
class Board extends Component {
  render() {
    const { board, moveFigure } = this.props.game;

    return (
      <BoardContainer>
        {board.map(row =>
          row.map(({ x, y, color, figure }) => (
            <Cell
              key={y + x}
              x={x}
              y={y}
              color={color}
              figure={figure}
              moveFigure={moveFigure}
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
