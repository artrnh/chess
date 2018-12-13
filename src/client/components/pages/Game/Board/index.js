import React, { Component } from 'react';

import { inject } from 'mobx-react';
import styled from 'styled-components';

import Cell from './Cell';

@inject('game')
class Board extends Component {
  render() {
    const { board } = this.props.game;

    return (
      <BoardContainer>
        {board.map(row =>
          row.map(({ x, y, color, figure }) => (
            <Cell key={y + x} color={color} figure={figure} />
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
