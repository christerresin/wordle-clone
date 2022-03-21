import express from 'express';

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

let correctWord = '';

app.get('/api', (req, res) => {
  res.json({ message: feedback(guess, correctWord) });
});

app.get('/api/:guess', (req, res) => {
  res.json({ message: feedback(req.params.guess, correctWord) });
});

app.get('/api/words/:guess-:wordLength-:uniqueLetters', (req, res) => {
  let guess = req.params.guess;
  let wordLength = Number(req.params.wordLength);
  let uniqueLetters = req.params.uniqueLetters === 'false' ? false : true;
  correctWord = pickWord(words, wordLength, uniqueLetters);

  res.json({
    message: feedback(guess, correctWord),
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
