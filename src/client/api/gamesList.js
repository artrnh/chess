import axios from 'axios';

export const createGame = (name, userId, rules, board) =>
    axios.post('/api/games', {name, userId, rules, board});

export const getGames = () => axios.get('/api/games');
