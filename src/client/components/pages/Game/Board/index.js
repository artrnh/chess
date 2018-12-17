import React, { Component } from 'react';

import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { getCellColor, getCanDropColor } from 'Utils/board';
import Cell from './Cell';
import CustomDragLayer from './CustomDragLayer';

@inject('game')
@observer
class Board extends Component {
  static propTypes = {
    game: PropTypes.shape({
      board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)),
      moveFigure: PropTypes.func,
      canMove: PropTypes.func,
    }).isRequired,
  };

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
