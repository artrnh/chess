import mongoose from 'mongoose';

const gameSchema = mongoose.Schema({
    name: String,
    turn: {
        type: String,
        default: 'white'
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: []
        }
    ],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
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
