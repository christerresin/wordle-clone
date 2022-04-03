import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  playerId: { type: String, required: true },
  gameDuration: { type: Number, required: false },
  guessesCount: { type: Number, required: false },
  wordLength: { type: Number, required: false },
  correctWord: { type: String, required: false },
  uniqueLetters: { type: Boolean, required: false },
  gameId: { type: String, required: false },
  guessedWords: { type: Array, required: true },
});

export default mongoose.model('Highscore', userSchema);
