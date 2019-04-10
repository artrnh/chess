import axios from 'axios';

export const createGame = (name, userId, rules) =>
    axios.post('/api/games', {name, userId, rules});

export const getGames = () => axios.get('/api/games');
