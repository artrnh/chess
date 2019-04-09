import axios from 'axios';

export const createGame = (name, userId) =>
    axios.post('/api/games', {name, userId});

export const getGames = () => axios.get('/api/games');
