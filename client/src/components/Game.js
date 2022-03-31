import { useEffect, useState } from 'react';

import WordsList from './WordsList';
import WordInput from './WordInput';
import PlayerInput from './PlayerInput';
import HighscoresList from './HighscoresList';
import Dropdown from './Dropdown';
import ToggleSwitch from './ToggleSwitch';
import GameOver from './GameOver';

import './Game.css';

/*
  - guess input
  - letter holders
  - loop over feedback obj and set classNames based on result
  - indicators for status (correct, incorrect, misplaced) colored letters?
  - check winner, useState check array for all correct
  - winner? name input and POST

  - create configure game page
  - dropdown for word length settings
  - selector for unique letters
  - PLAY button

  - result/game finished page
  - reset states for game

  - design game (wordList) with boxes
  - design endScreen, display playerName, guesses, correct word and gameduration
  - add button for play again and highscores
*/

function Game() {
  const [result, setResult] = useState([]);
  const [guess, setGuess] = useState(null);
  const [guessedWords, setGuessedWords] = useState([]);
  const [wordLength, setWordLength] = useState(5);
  const [uniqueLetters, setUniqueLetters] = useState(false);
  const [gameId, setGameId] = useState('');
  const [gameObj, setGameObj] = useState();
  const [isWinner, setIsWinner] = useState(false);
  const [loading, setLoading] = useState(true);
  const [highscores, setHighscores] = useState(null);
  const [gameState, setgameState] = useState('start');
  const [menuItem, setMenuItem] = useState([
    {
      label: 'Game',
      active: true,
      link: '/',
    },
    {
      label: 'Highscore',
      active: false,
      link: '/highscore',
    },
    {
      label: 'Info',
      active: false,
      link: '/info',
    },
  ]);

  useEffect(() => {
    if (!loading) {
      handleGuess();
    }
  }, [guess]);

  useEffect(() => {
    setGameObj({
      ...gameObj,
      playerId: 'Doe',
      guessesCount: guessedWords.length,
      wordLength: wordLength,
      uniqueLetters: uniqueLetters,
      gameId: gameId,
    });
  }, [guessedWords]);

  useEffect(() => {
    if (
      result.filter((obj) => {
        return obj.result === 'correct';
      }).length === wordLength
    ) {
      setIsWinner(true);
      setGameObj({ ...gameObj, gameEnd: new Date().getTime() / 1000 });
    }
  }, [result]);

  const handleGuess = async () => {
    const res = await fetch(`/api/words/${gameId}/${guess}`);

    const data = await res.json();
    setResult(data.message);
    guessedWords
      ? setGuessedWords([...guessedWords, data.message])
      : setGuessedWords([...data.message]);
  };

  const startNewGame = async () => {
    const res = await fetch(
      `/api/words/${guess}-${wordLength}-${uniqueLetters}`,
      {
        method: 'POST',
      }
    );
    const data = await res.json();

    console.log(data.message);
    setGameObj({ ...gameObj, gameStart: new Date().getTime() / 1000 });
    setGameId(data.gameId);
    setLoading(false);
    setgameState('playing');
  };

  const handleInputChange = (input) => {
    let guessedWord = input;
    if (guessedWord.length === wordLength) {
      setGuess(guessedWord);
    }
  };

  const loadHighscores = async (status) => {
    if (status === true) {
      setLoading(status);
      const res = await fetch('/api/highscore');
      const data = await res.json();
      setHighscores(data.highscores);
      setgameState('gameover');
    }
  };

  const handleUniqueLetters = () => {
    setUniqueLetters(!uniqueLetters);
  };

  const handleWordLength = (value) => {
    setWordLength(value);
  };

  const handleOnPlayClick = async () => {
    setLoading(true);
    await startNewGame();
  };

  if (gameState === 'playing') {
    return (
      <div className='Game'>
        <WordsList guessedWords={guessedWords} wordLength={wordLength} />
        {isWinner ? (
          <PlayerInput gameObj={gameObj} loadHighscores={loadHighscores} />
        ) : (
          <WordInput
            handleInputChange={handleInputChange}
            wordLength={wordLength}
            result={result}
          />
        )}
      </div>
    );
  } else if (gameState === 'highscore') {
    return (
      <div className='Game'>
        <HighscoresList highscores={highscores} />
      </div>
    );
  } else if (gameState === 'gameover') {
    return (
      <div className='Game'>
        <GameOver gameObj={gameObj} />
      </div>
    );
  }

  return (
    <div className='Game'>
      <nav>
        <h1>WÖÖÖRDL</h1>
        <ul className='app__menu'>
          {menuItem.map((item) => {
            return (
              <li
                className={`app__menu-item ${item.active ? 'selected' : ''}`}
                key={item.label}
              >
                <a href={item.link}>{item.label}</a>
              </li>
            );
          })}
        </ul>
      </nav>
      <div>
        <h3>Configure game</h3>
        <Dropdown wordLength={wordLength} handleWordLength={handleWordLength} />
        <ToggleSwitch
          label='Only unique letters?'
          handleUniqueLetters={handleUniqueLetters}
        />
        <button className='app__game-button' onClick={handleOnPlayClick}>
          PLAY!
        </button>
      </div>
    </div>
  );
}

export default Game;
