import express from 'express';
import crypto from 'crypto';
import bodyParser from 'body-parser';
import path from 'path';

import feedback from './feedback';
import pickWord from './pickWord';
import { words } from './words';
import {
  createNewHighscore,
  getAllHighscores,
  deleteAllHighscores,
  getHighscores,
} from './db/Controller';

const PORT = process.env.PORT || 5080;
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(express.static('public/build'));

// console.log(await getAllHighscores());
// deleteAllHighscores();
// getHighscores('BOB');

type Game = {
  gameId: string;
  correctWord: string;
  gameStart: number;
  guessedWords: string[];
  guessesCount: number;
};

let games: Game[] = [];

// REST ROUTES
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/highscore', async (req, res) => {
  const highscores = await getAllHighscores();
  res.render('pages/index', { highscores: highscores });
});

app.get('/info', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'info.html'));
});

// API ROUTES
app.get('/api/words/:gameid/:guess', (req, res) => {
  const newGuess = req.params.guess;
  const correctGameObj = games.find((obj) => {
    return obj.gameId === req.params.gameid;
  });

  if (correctGameObj && correctGameObj.correctWord != undefined) {
    correctGameObj.guessedWords.push(newGuess);
    correctGameObj.guessesCount += 1;

    res.json({
      message: feedback(req.params.guess, correctGameObj.correctWord),
    });
  }
});

app.post('/api/words/:wordLength-:uniqueLetters', (req, res) => {
  let wordLength = Number(req.params.wordLength);
  let uniqueLetters = req.params.uniqueLetters === 'false' ? false : true;
  const game = {
    correctWord: pickWord(words, wordLength, uniqueLetters),
    gameId: crypto.randomUUID(),
    gameStart: new Date().getTime() / 1000,
    guessedWords: [],
    guessesCount: 0,
  };
  games.push(game);

  res.json({
    gameId: game.gameId,
  });
});

app.get('/api/highscore', async (req, res) => {
  res.json({ highscores: await getAllHighscores() });
});

app.post('/api/highscore', async (req, res) => {
  const gameEnd = new Date().getTime() / 1000;
  const gameId = req.body.gameId;
  const game = games.find((obj) => {
    return obj.gameId === gameId;
  });

  if (game && game.correctWord != undefined) {
    const playerObj = {
      ...req.body,
      correctWord: game.correctWord,
      gameEnd: gameEnd,
      gameStart: game.gameStart,
      guessesCount: game.guessesCount,
      guessedWords: game.guessedWords,
    };

    await createNewHighscore(playerObj);

    // remove finished game from games Arr
    const gameIdx = games.findIndex((obj) => {
      return obj.gameId === gameId;
    });
    games.splice(gameIdx, 1);

    res.json(playerObj);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
