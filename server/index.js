import express from 'express';
import crypto from 'crypto';

import feedback from './feedback.js';
import pickWord from './pickWord.js';
import { words } from './words.js';

const PORT = process.env.PORT || 3001;

const app = express();

/*
  - Get guess from frontend
  - pick random correctWord and keep it hidden (not using global var on server)
  - call feedback
  - if all correct, obj with timeStamps et.c
  - post winner route
*/

let games = [{ gameId: '12312', correctWord: 'NOTCORRECT' }];

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
  let correctWord = pickWord(words, wordLength, uniqueLetters);
  let gameId = crypto.randomUUID();
  games.push({
    correctWord: correctWord,
    gameId: gameId,
  });

  res.json({
    gameId: gameId,
    message: correctWord,
  });
});

app.post('/highscore', (req, res) => {});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
