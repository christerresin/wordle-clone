import { useEffect, useState } from 'react';

import WordsList from './components/WordsList';
import WordInput from './components/WordInput';

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
  const [guessedWords, setGuessedWords] = useState(null);
  const [wordLength, setWordLength] = useState(5);
  const [uniqueLetters, setUniqueLetters] = useState(false);

  useEffect(() => {
    fetch(`/api/words/${guess}-${wordLength}-${uniqueLetters}`, {
      method: 'POST',
    })
      .then((res) => res.json())
      .then((data) => console.log(data.message));
  }, [wordLength, uniqueLetters]);

  useEffect(() => {
    fetch(`/api/words/${guess}`)
      .then((res) => res.json())
      .then((data) => {
        setResult(data.message);
        guessedWords
          ? setGuessedWords([...guessedWords, data.message])
          : setGuessedWords([...data.message]);
      });
  }, [guess]);

  const isWinner =
    result.filter((obj) => {
      return obj.result === 'correct';
    }).length === 5
      ? true
      : false;

  const handleInputChange = (input) => {
    let guessedWord = input;
    if (guessedWord.length === wordLength) {
      setGuess(guessedWord);
    }
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <WordsList guessedWords={guessedWords} />
        <WordInput
          handleInputChange={handleInputChange}
          wordLength={wordLength}
        />
      </header>
    </div>
  );
}

export default App;
