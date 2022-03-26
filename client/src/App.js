import { useEffect, useState } from 'react';

import WordsList from './components/WordsList';
import WordInput from './components/WordInput';
import PlayerInput from './components/PlayerInput';
import HighscoresList from './components/HighscoresList';
import Menu from './components/Menu';

import './App.css';

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

function App() {
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

  useEffect(() => {
    fetch(`/api/words/${guess}-${wordLength}-${uniqueLetters}`, {
      method: 'POST',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        setGameObj({ ...gameObj, gameStart: new Date().getTime() / 1000 });
        setGameId(data.gameId);
        setLoading(false);
      });
  }, [wordLength, uniqueLetters]);

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

  const handleInputChange = (input) => {
    let guessedWord = input;
    if (guessedWord.length === wordLength) {
      setGuess(guessedWord);
    }
  };

  const loadHighscores = (status) => {
    if (status === true) {
      setLoading(status);
      fetch('/highscore')
        .then((res) => res.json())
        .then((data) => setHighscores(data.highscores))
        .then(setLoading(false));
    }
  };

  const handleUniqueLetters = () => {
    setUniqueLetters(!uniqueLetters);
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
          <div>How many letters input</div>
          <div>uniqueLetters toggle</div>
          <button>PLAY!</button>
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

  return (
    <div className='App'>
      <header className='App-header'>
        <Menu handleUniqueLetters={handleUniqueLetters} />
      </header>
      <div className='app__game'>
        {highscores ? renderHighscores() : renderGameBoard()}
      </div>
    </div>
  );
}

export default App;
