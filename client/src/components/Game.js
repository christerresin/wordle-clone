import { useEffect, useState } from 'react';

import WordsList from './WordsList';
import WordInput from './WordInput';
import PlayerInput from './PlayerInput';
import HighscoresList from './HighscoresList';
import Dropdown from './Dropdown';
import ToggleSwitch from './ToggleSwitch';
import Menu from './Menu';

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

  // useEffect(() => {
  //   fetch(`/api/words/${guess}-${wordLength}-${uniqueLetters}`, {
  //     method: 'POST',
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data.message);
  //       setGameObj({ ...gameObj, gameStart: new Date().getTime() / 1000 });
  //       setGameId(data.gameId);
  //       setLoading(false);
  //     });
  // }, [wordLength, uniqueLetters]);

  useEffect(() => {
    if (!loading) {
      fetch(`/api/words/${gameId}/${guess}`)
        .then((res) => res.json())
        .then((data) => {
          setResult(data.message);
          guessedWords
            ? setGuessedWords([...guessedWords, data.message])
            : setGuessedWords([...data.message]);
        });
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

  useEffect(() => {
    if (gameState === 'start') {
      renderGameStart();
    } else if (gameState === 'playing') {
      renderGameBoard();
    } else if (gameState === 'highscore') {
      renderHighscores();
    }
  }, [gameState]);

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
      const res = await fetch('/highscore');
      const data = res.json();
      setHighscores(data.highscores);
      setLoading(false);
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

  const renderGameStart = () => {
    const menuItem = ['Game', 'Highscore', 'Info'];
    return (
      <>
        <nav>
          <h1>WÖÖÖRDL</h1>
          <ul>
            {menuItem.map((item) => {
              return <li key={item}>{item}</li>;
            })}
          </ul>
        </nav>
        <div>
          <h3>Configure game</h3>
          <Dropdown
            wordLength={wordLength}
            handleWordLength={handleWordLength}
          />
          <ToggleSwitch
            label='Only unique letters?'
            handleUniqueLetters={handleUniqueLetters}
          />
          <button onClick={handleOnPlayClick}>PLAY!</button>
        </div>
      </>
    );
  };

  const renderGameBoard = () => {
    return (
      <>
        <WordsList guessedWords={guessedWords} />
        {isWinner ? (
          <PlayerInput gameObj={gameObj} loadHighscores={loadHighscores} />
        ) : (
          <WordInput
            handleInputChange={handleInputChange}
            wordLength={wordLength}
            result={result}
          />
        )}
      </>
    );
  };

  const renderHighscores = () => {
    return (
      <>
        <HighscoresList highscores={highscores} />
      </>
    );
  };

  return <>{gameState === 'start' ? renderGameStart() : null}</>;

  // return (
  //   <div className='Game'>
  //     <header className='Game-header'>
  //       <Menu handleUniqueLetters={handleUniqueLetters} />
  //     </header>
  //     <div className='Game__game'>
  //       {highscores ? renderHighscores() : renderGameBoard()}
  //     </div>
  //   </div>
  // );
}

export default Game;
