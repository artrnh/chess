import User from '../models/user';

export const initUser = (req, res) => {
    const user = new User();
    user.save().then(userData => res.status(201).json(userData));
};

export const updateUser = (req, res) => {
    const {...updatedData} = req.body;
    const {id} = req.params;

    User.findByIdAndUpdate(id, {...updatedData}, {new: true}).then(user =>
        res.json(user)
    );
};
