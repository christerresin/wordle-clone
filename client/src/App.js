import { useEffect, useState } from 'react';
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
        setGuessedWords([...guessedWords, data.message]);
      });
  }, [guess]);

  const handleOnChange = (event) => {
    let guessedWord = event.target.value;
    if (guessedWord.length === wordLength) {
      setGuess(guessedWord);
    }
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <ul>
          {result.map((obj, index) => {
            return (
              <li className={obj.result} key={obj.letter + index}>
                {obj.letter.toUpperCase()}
              </li>
            );
          })}
        </ul>
        <input type='text' onChange={handleOnChange} />
      </header>
    </div>
  );
}

export default App;
