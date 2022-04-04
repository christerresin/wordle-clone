import { useEffect, useState } from 'react';

import WordsList from './WordsList';
import WordInput from './WordInput';
import PlayerInput from './PlayerInput';
import HighscoresList from './HighscoresList';
import Dropdown from './Dropdown';
import ToggleSwitch from './ToggleSwitch';
import GameOver from './GameOver';
import Loading from './Loading';
import Menu from './Menu';

import './Game.css';

function Game() {
  const [result, setResult] = useState([]);
  const [guess, setGuess] = useState(null);
  const [guessedWords, setGuessedWords] = useState([]);
  const [currentGuess, setCurrentGuess] = useState([]);
  const [wordLength, setWordLength] = useState(5);
  const [uniqueLetters, setUniqueLetters] = useState(false);
  const [gameObj, setGameObj] = useState();
  const [isWinner, setIsWinner] = useState(false);
  const [loading, setLoading] = useState(true);
  const [highscores, setHighscores] = useState(null);
  const [gameState, setgameState] = useState('start');
  const [menuItems, setMenuItems] = useState([
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
      playerId: 'UnknownPlayer',
      guessesCount: guessedWords.length,
      wordLength: wordLength,
      uniqueLetters: uniqueLetters,
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
    const res = await fetch(`/api/words/${gameObj.gameId}/${guess}`);

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

    setGameObj({
      ...gameObj,
      gameId: data.gameId,
      gameStart: new Date().getTime() / 1000,
      guessedWords: [],
    });
    setLoading(false);
  };

  const handleInputChange = (input) => {
    let guessedWord = input;
    if (guessedWord.length === wordLength) {
      setGuess(guessedWord);
      setGameObj({
        ...gameObj,
        guessedWords: [...gameObj.guessedWords, guessedWord],
      });
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
    setgameState('playing');

    await startNewGame();
  };

  const handleNewPlayerId = (playerId) => {
    setGameObj({ ...gameObj, playerId: playerId });
  };

  const handleCurrentGuess = (currentGuessArr) => {
    setCurrentGuess(currentGuessArr);
  };

  if (gameState === 'playing') {
    if (loading) {
      return <Loading />;
    }
    return (
      <div className='Game'>
        <WordsList
          guessedWords={guessedWords}
          wordLength={wordLength}
          currentGuess={currentGuess}
          isWinner={isWinner}
        />
        {isWinner ? (
          <PlayerInput
            gameObj={gameObj}
            loadHighscores={loadHighscores}
            handleNewPlayerId={handleNewPlayerId}
          />
        ) : (
          <WordInput
            handleInputChange={handleInputChange}
            wordLength={wordLength}
            result={result}
            handleCurrentGuess={handleCurrentGuess}
          />
        )}
      </div>
    );
  } else if (gameState === 'highscore') {
    if (loading) {
      return <Loading />;
    }
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
        <Menu menuItems={menuItems} />
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
