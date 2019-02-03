import mongoose from 'mongoose';

const gameSchema = mongoose.Schema({
  name: String,
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
          moved: Boolean,
        },
      },
    ],
  ],
});

export default mongoose.model('Game', gameSchema);
