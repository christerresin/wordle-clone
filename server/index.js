import express from 'express';
import crypto from 'crypto';
import bodyParser from 'body-parser';

import feedback from './feedback.js';
import pickWord from './pickWord.js';
import { words } from './words.js';
import {
  createNewHighscore,
  getAllHighscores,
  deleteAllHighscores,
  getHighscores,
} from './db/Controller.js';

const PORT = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/*
  - Get guess from frontend
  - pick random correctWord and keep it hidden (not using global var on server)
  - call feedback
  - if all correct, obj with timeStamps et.c
  - post winner route
*/

// await createNewHighscore(
//   'Lisa',
//   new Date().getTime() / 1000,
//   new Date().getTime() / 1000,
//   2,
//   5,
//   'smell',
//   false
// );

// console.log(await getAllHighscores());
// deleteAllHighscores();
// getHighscores('Lisa');

let games = [
  { gameId: '12312', correctWord: 'NOTCORRECT' },
  { gameId: '12312', correctWord: 'NOTCORRECT' },
];

app.get('/api', (req, res) => {
  res.json({ message: feedback(guess, correctWord) });
});

app.get('/api/words/:gameid/:guess', (req, res) => {
  const correctGameObj = games.find((obj) => {
    return obj.gameId === req.params.gameid;
  });

  res.json({ message: feedback(req.params.guess, correctGameObj.correctWord) });
});

app.post('/api/words/:guess-:wordLength-:uniqueLetters', (req, res) => {
  let wordLength = Number(req.params.wordLength);
  let uniqueLetters = req.params.uniqueLetters === 'false' ? false : true;
  const correctWord = pickWord(words, wordLength, uniqueLetters);
  const gameId = crypto.randomUUID();
  games.push({
    correctWord: correctWord,
    gameId: gameId,
  });

  res.json({
    gameId: gameId,
    message: correctWord,
  });
});

app.get('/highscore', async (req, res) => {
  res.json({ highscores: await getAllHighscores() });
});

app.post('/api/highscore', async (req, res) => {
  const gameId = req.body.gameId;
  const game = games.find((obj) => {
    return obj.gameId === gameId;
  });
  const playerObj = { ...req.body, correctWord: game.correctWord };
  await createNewHighscore(playerObj);

  // remove finished game from games Arr
  const gameIdx = games.findIndex((obj) => {
    return obj.gameId === gameId;
  });
  games.splice(gameIdx, 1);

  res.json(playerObj);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
