import { useEffect, useState } from 'react';

function WordInput(props) {
  const [guess, setGuess] = useState('');

  // useEffect(() => {
  //   console.log(
  //     Math.abs((new Date().getTime() - gameDuration.start.getTime()) / 1000)
  //   );
  // }, [gameDuration]);

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
