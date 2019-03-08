import mongoose from 'mongoose';

const gameSchema = mongoose.Schema({
    name: String,
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: []
        }
    ],
    board: [
        [
            {
                x: Number,
                y: Number,
                figure: {
                    id: String,
                    name: String,
                    color: String,
                    position: [Number],
                    moved: Boolean
                }
            }
        ]
    ]
});

export default mongoose.model('Game', gameSchema);
