import express from 'express';
import crypto from 'crypto';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import feedback from './feedback.js';
import pickWord from './pickWord.js';
import { words } from './words.js';
import Highscore from './Highscore.js';

const PORT = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// connect to mongoDB
const dbURI = `mongodb+srv://christerresin:TB8WIHS0PR755uXn@wordledb.phlpc.mongodb.net/wordledb?retryWrites=true&w=majority`;
mongoose.connect(dbURI, () => {
  console.log('connected');
});

async function run() {
  try {
    const highscore = new Highscore({ playerId: 'Mark' });
    await highscore.save();
    console.log(highscore);
  } catch (e) {
    console.log(e.message);
  }
}
// run();

async function deleteHighscore() {
  try {
    const highscore = await Highscore.find({ playerId: 'Bob' });

    highscore[0].playerId = 'Bob';
    highscore[0].delete();
    console.log(highscore);
  } catch (e) {
    console.log(e.message);
  }
}
// deleteHighscore();

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
    gameStart: new Date(),
  });

  res.json({
    gameId: gameId,
    message: correctWord,
  });
});

app.post('/api/highscore', (req, res) => {
  console.log('Got body: ' + req.body);
  /*
    - check post body for obj with playerId and gameId
    - create obj with highscore data (playerId, gameStart, gameEnd, guessesCount, correctWord,  wordLength, uniqueLetters) and push to highscores Arr
    - redirect user to /highscores
    - find index of gameId obj in games Arr and splice
  */
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
