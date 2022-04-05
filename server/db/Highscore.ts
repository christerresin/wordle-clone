import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  playerId: { type: String, required: true },
  gameDuration: { type: Number, required: true },
  guessesCount: { type: Number, required: true },
  wordLength: { type: Number, required: true },
  correctWord: { type: String, required: true },
  uniqueLetters: { type: Boolean, required: true },
  gameId: { type: String, required: true },
  guessedWords: { type: Array, required: true },
});

export default mongoose.model('Highscore', userSchema);
