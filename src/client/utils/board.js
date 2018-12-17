import Cell from 'Models/Cell';
import Figure from 'Models/Figure';

const nonEmptyRows = [0, 1, 6, 7];
const blackRows = [0, 1];
// const whiteRows = [6, 7];
const pawnRows = [1, 6];
const figureLayout = [
  'rook',
  'knight',
  'bishop',
  'queen',
  'king',
  'bishop',
  'knight',
  'rook',
];

export const getCellColor = (x, y) => ((x + y) % 2 ? '#B58763' : '#F0DAB5');
export const getCanDropColor = (x, y) => ((x + y) % 2 ? '#AAA33B' : '#CDD26C');
export const getFigureColor = y => (blackRows.includes(y) ? 'black' : 'white');

export const createBoard = () =>
  Array.from({ length: 8 }).map((row, y) =>
    Array.from({ length: 8 }).map((cell, x) => {
      if (!nonEmptyRows.includes(y)) return new Cell(x, y);

      if (pawnRows.includes(y))
        return new Cell(x, y, new Figure('pawn', getFigureColor(y), [x, y]));

      return new Cell(
        x,
        y,
        new Figure(figureLayout[x], getFigureColor(y), [x, y])
      );
    })
  );
