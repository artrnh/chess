import axios from 'axios';

export const initUser = () => axios.post('/api/user');
