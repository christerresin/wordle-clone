import { useState } from 'react';

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
  const [guessedWords, setGuessedWords] = useState([]);
  const [currentGuess, setCurrentGuess] = useState([]);
  const [gameObj, setGameObj] = useState({
    uniqueLetters: false,
    wordLength: 5,
  });
  const [isWinner, setIsWinner] = useState(false);
  const [loading, setLoading] = useState(true);
  const [highscores, setHighscores] = useState();
  const [gameState, setgameState] = useState('start');
  const menuItems = [
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
  ];

  const handleGuess = async (guessedWord) => {
    if (!loading) {
      const res = await fetch(`/api/words/${gameObj.gameId}/${guessedWord}`);
      const data = await res.json();

      guessedWords
        ? setGuessedWords([...guessedWords, data.message])
        : setGuessedWords([...data.message]);
      // Check if word is correct and set Winner
      handleCorrectWord(data.message, guessedWord);
    }
  };

  const handleCorrectWord = async (resultArr) => {
    if (
      resultArr.filter((obj) => {
        return obj.result === 'correct';
      }).length === gameObj.wordLength
    ) {
      setIsWinner(true);
    }
  };

  const startNewGame = async () => {
    const res = await fetch(
      `/api/words/${gameObj.wordLength}-${gameObj.uniqueLetters}`,
      {
        method: 'POST',
      }
    );
    const data = await res.json();

    setGameObj({
      ...gameObj,
      gameId: data.gameId,
    });
    setLoading(false);
  };

  const handleInputChange = (input) => {
    let guessedWord = input;
    if (guessedWord.length === gameObj.wordLength) {
      handleGuess(guessedWord);
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
    setGameObj((prevState) => {
      return { ...gameObj, uniqueLetters: !prevState.uniqueLetters };
    });
  };

  const handleWordLength = (value) => {
    setGameObj({ ...gameObj, wordLength: value });
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

  const handleNewHighscoreEntry = (serverGameObj) => {
    setGameObj(serverGameObj);
  };

  if (gameState === 'playing') {
    if (loading) {
      return <Loading />;
    }
    return (
      <div className='Game'>
        <WordsList
          guessedWords={guessedWords}
          wordLength={gameObj.wordLength}
          currentGuess={currentGuess}
          isWinner={isWinner}
        />
        {isWinner ? (
          <PlayerInput
            gameObj={gameObj}
            loadHighscores={loadHighscores}
            handleNewPlayerId={handleNewPlayerId}
            handleNewHighscoreEntry={handleNewHighscoreEntry}
          />
        ) : (
          <WordInput
            handleInputChange={handleInputChange}
            wordLength={gameObj.wordLength}
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
        <h1>W??????RDL</h1>
        <Menu menuItems={menuItems} />
      </nav>
      <div>
        <h3>Configure game</h3>
        <Dropdown
          wordLength={gameObj.wordLength}
          handleWordLength={handleWordLength}
        />
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
