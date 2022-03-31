import { useEffect, useState } from 'react';

import './WordInput.css';

function WordInput(props) {
  const [guess, setGuess] = useState('');

  const handleOnChange = (event) => {
    let guessedWord = event.target.value;
    setGuess(guessedWord);
    props.handleCurrentGuess(guessedWord.split(''));
    if (guessedWord.length === props.wordLength) {
      props.handleInputChange(guessedWord);
      setGuess('');
      props.handleCurrentGuess([]);
    }
  };

  return (
    <input
      className='app__wordInput'
      type='text'
      value={guess}
      onChange={handleOnChange}
    />
  );
}

export default WordInput;
