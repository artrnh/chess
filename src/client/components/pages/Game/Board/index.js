import React, { Component } from 'react';

import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

import { getCellColor, getCanDropColor } from 'Utils/board';
import Cell from './Cell';

@inject('game')
@observer
class Board extends Component {
  render() {
    const { board, moveFigure, canMove } = this.props.game;

    return (
      <BoardContainer>
        {board.map(row =>
          row.map(({ x, y, figure }) => (
            <Cell
              key={y + x}
              x={x}
              y={y}
              color={getCellColor(x, y)}
              canDropColor={getCanDropColor(x, y)}
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
