import express from 'express';

import feedback from './feedback.js';
import pickWord from './pickWord.js';
import { words } from './words.js';

const PORT = process.env.PORT || 3001;

const app = express();

/*
  - Get guess from frontend
  - call feedback
  - if all correct, obj with timeStamps et.c
  - post winner route
*/

app.get('/api', (req, res) => {
  res.json({ message: feedback('to', pickWord(words, 2, false)) });
});

app.get('/api/:guess-:wordLength-:uniqueLetters', (req, res) => {
  let guess = req.params.guess;
  let wordLength = Number(req.params.wordLength);
  let uniqueLetters = req.params.uniqueLetters === 'false' ? false : true;

  res.json({
    message: feedback(guess, pickWord(words, wordLength, uniqueLetters)),
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
