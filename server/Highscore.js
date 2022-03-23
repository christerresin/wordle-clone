import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  playerId: String,
  gameStart: String,
  gameEnd: String,
  guessesCount: Number,
  wordLength: Number,
  correctWord: String,
  uniqueLetters: Boolean,
});

export default mongoose.model('Highscore', userSchema);
