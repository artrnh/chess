import _ from 'lodash';

export default color => [
    {
        id: _.uniqueId('king'),
        name: 'king',
        color,
        moved: false
    },
    {
        id: _.uniqueId('queen'),
        name: 'queen',
        color,
        moved: false
    },
    {
        id: _.uniqueId('rook'),
        name: 'rook',
        color,
        moved: false
    },
    {
        id: _.uniqueId('bishop'),
        name: 'bishop',
        color,
        moved: false
    },
    {
        id: _.uniqueId('knight'),
        name: 'knight',
        color,
        moved: false
    },
    {
        id: _.uniqueId('pawn'),
        name: 'pawn',
        color,
        moved: false
    }
];
