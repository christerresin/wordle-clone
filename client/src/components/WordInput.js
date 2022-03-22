import { useState } from 'react';

function WordInput(props) {
  const [guess, setGuess] = useState('');

  const handleOnChange = (event) => {
    let guessedWord = event.target.value;
    setGuess(guessedWord);
    if (guessedWord.length === props.wordLength) {
      props.handleInputChange(guessedWord);
      setGuess('');
    }
  };

  return <input type='text' value={guess} onChange={handleOnChange} />;
}

export default WordInput;
