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

  const renderInputs = () => {
    return isWinner ? (
      <>
        <p>WINNER!</p>
        <input type='text' placeholder='Enter your name' />
        {props.handleWinner(true)}
      </>
    ) : (
      <input type='text' value={guess} onChange={handleOnChange} />
    );
  };

  return renderInputs();
}

export default WordInput;
