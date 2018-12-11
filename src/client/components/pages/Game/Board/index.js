import React, { Component } from 'react';

import { inject } from 'mobx-react';
import styled from 'styled-components';

import Cell from './Cell';

@inject('game')
class Board extends Component {
  render() {
    console.log(this.props);
    return (
      <BoardContainer>
        {this.props.game.board.map((row, y) =>
          row.map((cell, x) => (
            <Cell
              key={y + x}
              color={
                y % 2
                  ? x % 2
                    ? '#F0DAB5'
                    : '#B58763'
                  : x % 2
                  ? '#B58763'
                  : '#F0DAB5'
              }
              figureColor={cell ? cell.color : null}
              name={cell ? cell.name : null}
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
