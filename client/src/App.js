import { useEffect, useState } from 'react';

import WordsList from './components/WordsList';
import WordInput from './components/WordInput';
import PlayerInput from './components/PlayerInput';

import './App.css';

/*
  - guess input
  - letter holders
  - loop over feedback obj and set classNames based on result
  - indicators for status (correct, incorrect, misplaced) colored letters?
  - check winner, useState check array for all correct
  - winner? name input and POST
*/

function App() {
  const [result, setResult] = useState([]);
  const [guess, setGuess] = useState(null);
  const [guessedWords, setGuessedWords] = useState([]);
  const [wordLength, setWordLength] = useState(5);
  const [uniqueLetters, setUniqueLetters] = useState(false);
  const [gameId, setGameId] = useState('');
  const [gameObj, setGameObj] = useState();
  const [isWinner, setIsWinner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [highscores, setHighscores] = useState(null);

  useEffect(() => {
    fetch(`/api/words/${guess}-${wordLength}-${uniqueLetters}`, {
      method: 'POST',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
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
      playerId: 'Trinity',
      gameStart: 0,
      gameEnd: 34,
      guessesCount: guessedWords.length,
      wordLength: wordLength,
      uniqueLetters: uniqueLetters,
      gameId: gameId,
    });
  }, [guessedWords]);

  useEffect(() => {
    setIsWinner(
      result.filter((obj) => {
        return obj.result === 'correct';
      }).length === wordLength
        ? true
        : false
    );
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
      setHighscores(['YUPP']);
      fetch('/highscore')
        .then((res) => res.json())
        .then((data) => setHighscores(data.highscores));
    }
    console.log(highscores);
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
        <h1>HIGHSCORES!</h1>
      </>
    );
  };

  return (
    <div className='App'>
      <header className='App-header'>
        {highscores ? renderHighscores() : renderGameBoard()}
      </header>
    </div>
  );
}

export default App;
