import axios from 'axios';

export const createGame = name => axios.post('/api/games', { name });
export const getGames = () => axios.get('/api/games');
