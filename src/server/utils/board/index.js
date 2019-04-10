import {classic, horde} from './creators';

export const createBoard = rules => {
    switch (rules) {
        case 'Classic':
            return classic();
        case 'Horde':
            return horde();
        default:
            return classic();
    }
};
