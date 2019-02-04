import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  name: {
    type: String,
    default: 'Anonymous',
  },
  color: String,
  game: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
  },
});

export default mongoose.model('User', userSchema);
