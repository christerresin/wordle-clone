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

const __dirname = path.resolve();
const PORT = process.env.PORT || 5080;
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

// console.log(await getAllHighscores());
// deleteAllHighscores();
// getHighscores('BOB');

let games = [
  { gameId: '12312', correctWord: 'NOTCORRECT' },
  { gameId: '12312', correctWord: 'NOTCORRECT' },
];

// REST ROUTES
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/highscore', async (req, res) => {
  const highscores = await getAllHighscores();
  res.render('pages/index', { highscores: highscores });
});

app.get('/info', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'info.html'));
});

// API ROUTES
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
  });
});

app.get('/api/highscore', async (req, res) => {
  res.json({ highscores: await getAllHighscores() });
});

app.post('/api/highscore', async (req, res) => {
  const gameId = req.body.gameId;
  const game = games.find((obj) => {
    return obj.gameId === gameId;
  });
  const playerObj = { ...req.body, correctWord: game.correctWord };
  console.log(playerObj);
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
