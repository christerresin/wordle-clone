import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  playerId: { type: String, required: true },
  gameStart: { type: String, required: true },
  gameEnd: { type: String, required: true },
  guessesCount: { type: Number, required: true },
  wordLength: { type: Number, required: true },
  correctWord: { type: String, required: true },
  uniqueLetters: { type: Boolean, required: true },
});

export default mongoose.model('Highscore', userSchema);
