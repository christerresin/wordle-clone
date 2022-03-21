import { useEffect, useState } from 'react';
import logo from './logo.svg';
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
  const [guess, setGuess] = useState([]);

  useEffect(() => {
    fetch('/api/mount-5-false')
      .then((res) => res.json())
      .then((data) => setGuess(data.message));
  }, []);

  return (
    <div className='App'>
      <header className='App-header'>
        <ul>
          {guess.map((obj, index) => {
            return (
              <li className={obj.result} key={obj.letter + index}>
                {obj.letter.toUpperCase()}
              </li>
            );
          })}
        </ul>
        <p>{!guess ? 'loading...' : console.log(guess)}</p>
      </header>
    </div>
  );
}

export default App;
