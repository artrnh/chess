import React from 'react';

import styled from 'styled-components';

import Cell from './Cell';

const Board = () => (
  <BoardContainer>
    {Array.from({ length: 8 }).map((_, i) =>
      Array.from({ length: 8 }).map((_, j) => (
        <Cell
          color={
            i % 2
              ? j % 2
                ? '#F0DAB5'
                : '#B58763'
              : j % 2
              ? '#B58763'
              : '#F0DAB5'
          }
        />
      ))
    )}
  </BoardContainer>
);

const BoardContainer = styled.div`
  width: 512px;
  height: 512px;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
`;

export default Board;
