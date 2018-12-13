import Cell from 'Models/Cell';
import Figure from 'Models/Figure';

const nonEmptyRows = [0, 1, 6, 7];
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

export const getCellColor = (x, y) =>
  y % 2 ? (x % 2 ? '#F0DAB5' : '#B58763') : x % 2 ? '#B58763' : '#F0DAB5';

export const createBoard = () =>
  Array.from({ length: 8 }).map((row, y) =>
    Array.from({ length: 8 }).map((cell, x) => {
      if (!nonEmptyRows.includes(y)) return new Cell(x, y, getCellColor(x, y));

      if (pawnRows.includes(y))
        return new Cell(
          x,
          y,
          getCellColor(x, y),
          new Figure('pawn', [0, 1].includes(y) ? 'white' : 'black')
        );
      else
        return new Cell(
          x,
          y,
          getCellColor(x, y),
          new Figure(figureLayout[x], [0, 1].includes(y) ? 'white' : 'black')
        );
    })
  );
