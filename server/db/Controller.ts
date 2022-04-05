import mongoose from 'mongoose';

import Highscore from './Highscore';

// connect to mongoDB
const dbURI = `mongodb+srv://christerresin:TB8WIHS0PR755uXn@wordledb.phlpc.mongodb.net/wordledb?retryWrites=true&w=majority`;
mongoose.connect(dbURI, () => {
  console.log('DB connected');
});

type Player = {
  playerId: string;
  gameStart: number;
  gameEnd: number;
  guessesCount: number;
  wordLength: number;
  correctWord: string;
  uniqueLetters: boolean;
  gameId: string;
  guessedWords: string[];
};

async function createNewHighscore(playerObj: Player) {
  const playerId = playerObj.playerId;
  const gameStart = playerObj.gameStart;
  const gameEnd = playerObj.gameEnd;
  const guessesCount = playerObj.guessedWords.length;
  const wordLength = playerObj.wordLength;
  const correctWord = playerObj.correctWord;
  const uniqueLetters = playerObj.uniqueLetters;
  const gameId = playerObj.gameId;
  const guessedWords = playerObj.guessedWords;
  try {
    const gameDuration = gameEnd - gameStart;
    const highscore = new Highscore({
      playerId: playerId,
      gameDuration: gameDuration.toFixed(0),
      guessesCount: guessesCount,
      wordLength: wordLength,
      correctWord: correctWord,
      uniqueLetters: uniqueLetters,
      gameId: gameId,
      guessedWords: guessedWords,
    });
    await highscore.save();
    console.log('Added new highscore: ' + highscore);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log('Unexpected error', err);
    }
  }
}

async function getAllHighscores() {
  try {
    const highscoresArr = await Highscore.find();

    highscoresArr.sort((a, b) => {
      return a.gameDuration.toFixed(0) - b.gameDuration.toFixed(0);
    });
    return highscoresArr;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log('Unexpected error', err);
    }
  }
}

async function deleteAllHighscores() {
  try {
    const highscores = await Highscore.deleteMany({});
    console.log('All Highscore documents deleted');
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log('Unexpected error', err);
    }
  }
}

async function getHighscores(playerId: string) {
  try {
    const highscores = await Highscore.find({ playerId: playerId });
    console.log(highscores);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log('Unexpected error', err);
    }
  }
}

export {
  createNewHighscore,
  getAllHighscores,
  deleteAllHighscores,
  getHighscores,
};
