import { useEffect, useState } from 'react';

function WordInput(props) {
  const [guess, setGuess] = useState('');
  const [isWinner, setIsWinner] = useState(false);

  useEffect(() => {
    setIsWinner(
      props.result.filter((obj) => {
        return obj.result === 'correct';
      }).length === 5
        ? true
        : false
    );
  });

  const handleOnChange = (event) => {
    let guessedWord = event.target.value;
    setGuess(guessedWord);
    if (guessedWord.length === props.wordLength) {
      props.handleInputChange(guessedWord);
      setGuess('');
    }
  };

  return isWinner ? (
    <p>WINNER!</p>
  ) : (
    <input type='text' value={guess} onChange={handleOnChange} />
  );
}

export default WordInput;
