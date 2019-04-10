const figures = [
    'rook',
    'knight',
    'bishop',
    'queen',
    'king',
    'bishop',
    'knight',
    'rook'
];

export default () => {
    let shuffled;
    let correctShuffle = false;

    do {
        shuffled = [...figures].sort(() => 0.5 - Math.random());

        const leftRook = shuffled.indexOf('rook');
        const rightRook = shuffled.lastIndexOf('rook');
        const king = shuffled.indexOf('king');

        const leftBishop = shuffled.indexOf('bishop');
        const rightBishop = shuffled.lastIndexOf('bishop');

        correctShuffle =
            leftRook < king &&
            rightRook > king &&
            leftBishop % 2 !== rightBishop % 2;
    } while (!correctShuffle);

    return [
        shuffled,
        ['pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn'],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        ['pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn'],
        shuffled
    ];
};
