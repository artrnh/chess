import axios from 'axios';

export const initUser = () => axios.post('/api/user');
export const updateUser = (id, data) => axios.patch(`/api/user/${id}`, data);
