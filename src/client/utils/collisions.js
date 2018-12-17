import _ from 'lodash';

const checkCellsValidity = (cells, figure) => {
  const valid = [];

  for (let i = 0; i < cells.length; i += 1) {
    if (!_.isEmpty(cells[i].figure)) {
      if (cells[i].figure.color !== figure.color) {
        valid.push(cells[i]);
        break;
      } else break;
    } else valid.push(cells[i]);
  }

  return valid;
};

export const checkXYCollisions = (board, figure, validatingCell) => {
  const [x, y] = figure.position;

  const vertical = board.map(row => row[x]);
  const horizontal = board[y];

  const top = vertical.slice(0, y).reverse();
  const bottom = vertical.slice(y + 1);

  const left = horizontal.slice(0, x).reverse();
  const right = horizontal.slice(x + 1);

  const valid = [
    ...checkCellsValidity(top, figure),
    ...checkCellsValidity(bottom, figure),
    ...checkCellsValidity(left, figure),
    ...checkCellsValidity(right, figure),
  ];

  return valid.includes(validatingCell);
};

export const checkDiagonalCollisions = (board, figure, validatingCell) => {
  const [x, y] = figure.position;

  const diagonals = board
    .map(row =>
      row.filter(cell => x - y === cell.x - cell.y || x + y === cell.x + cell.y)
    )
    .reduce((acc, row) => [...acc, ...row], []);

  const leftTop = diagonals.filter(cell => cell.x < x && cell.y < y).reverse();
  const leftBottom = diagonals.filter(cell => cell.x < x && cell.y > y);

  const rigthTop = diagonals.filter(cell => cell.x > x && cell.y < y).reverse();
  const rightBottom = diagonals.filter(cell => cell.x > x && cell.y > y);

  const valid = [
    ...checkCellsValidity(leftTop, figure),
    ...checkCellsValidity(leftBottom, figure),
    ...checkCellsValidity(rigthTop, figure),
    ...checkCellsValidity(rightBottom, figure),
  ];

  return valid.includes(validatingCell);
};

export const checkPawnCollisions = ([toX, toY], figure, enemyFigure) => {
  const [x, y] = figure.position;
  const dx = toX - x;
  const dy = toY - y;

  const moveCheck = toX === x;
  const attackCheck = Math.abs(dx) === 1;

  const whiteMoveCheck =
    moveCheck &&
    (dy === -1 || (!figure.moved && dy === -2)) &&
    enemyFigure.color !== 'black';

  const whiteAttackCheck =
    attackCheck && dy === -1 && enemyFigure.color === 'black';

  const blackMoveCheck =
    moveCheck &&
    (dy === 1 || (!figure.moved && dy === 2)) &&
    enemyFigure.color !== 'white';

  const blackAttackCheck =
    attackCheck && dy === 1 && enemyFigure.color === 'white';

  return figure.color === 'white'
    ? whiteMoveCheck || whiteAttackCheck
    : blackMoveCheck || blackAttackCheck;
};

export const checkKnightCollisions = ([toX, toY], figure) => {
  const [x, y] = figure.position;
  const dx = toX - x;
  const dy = toY - y;

  return (
    (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
    (Math.abs(dx) === 1 && Math.abs(dy) === 2)
  );
};

export const checkKingCollisions = ([toX, toY], figure) => {
  const [x, y] = figure.position;
  const dx = toX - x;
  const dy = toY - y;

  return Math.abs(dx) <= 1 && Math.abs(dy) <= 1;
};
