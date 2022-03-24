import mongoose from 'mongoose';

import Highscore from './Highscore.js';

// connect to mongoDB
const dbURI = `mongodb+srv://christerresin:TB8WIHS0PR755uXn@wordledb.phlpc.mongodb.net/wordledb?retryWrites=true&w=majority`;
mongoose.connect(dbURI, () => {
  console.log('DB connected');
});

async function createNewHighscore(
  playerId,
  gameStart,
  gameEnd,
  guessesCount,
  wordLength,
  correctWord,
  uniqueLetters
) {
  try {
    // Edit below gameDuration calc when correct gameEnd and gameStart values as passed down
    const gameDuration = gameEnd + 4000 - gameStart;
    const highscore = new Highscore({
      playerId: playerId,
      gameDuration: gameDuration,
      guessesCount: guessesCount,
      wordLength: wordLength,
      correctWord: correctWord,
      uniqueLetters: uniqueLetters,
    });
    await highscore.save();
    console.log(highscore);
  } catch (e) {
    console.log(e.message);
  }
}

async function getAllHighscores() {
  try {
    const highscoresArr = await Highscore.find();
    highscoresArr.sort((a, b) => {
      return a.gameDuration - b.gameDuration;
    });
    return highscoresArr;
  } catch (e) {
    console.log(e.message);
  }
}

async function deleteAllHighscores() {
  try {
    const highscores = await Highscore.deleteMany({});
    console.log('All Highscore documents deleted');
  } catch (e) {
    console.log(e.message);
  }
}

async function getHighscores(playerId) {
  try {
    const highscores = await Highscore.find({ playerId: playerId });
    console.log(highscores);
  } catch (e) {
    console.log(e.message);
  }
}

export {
  createNewHighscore,
  getAllHighscores,
  deleteAllHighscores,
  getHighscores,
};
