import axios from 'axios';

export const getGame = id => axios.get(`/api/games/${id}`);
export const deleteGame = id => axios.delete(`/api/games/${id}`);
export const updateGame = (id, data) => axios.patch(`/api/games/${id}`, data);
