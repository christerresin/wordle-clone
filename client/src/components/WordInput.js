function WordInput(props) {
  const handleOnChange = (event) => {
    let guessedWord = event.target.value;
    if (guessedWord.length === props.wordLength) {
      props.handleInputChange(guessedWord);
    }
  };

  return <input type='text' onChange={handleOnChange} />;
}

export default WordInput;
