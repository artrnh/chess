import User from '../models/user';

export const initUser = (req, res) => {
    const user = new User();
    user.save().then(userData => res.status(201).json(userData));
};
