function feedback(guessed: string, answear: string) {
  type Result = {
    letter: string;
    result: string;
  };

  let checkedArr: Result[] = [];

  // Conditionals for arg strings (length, type, matching length)
  if (
    typeof guessed !== 'string' ||
    typeof answear !== 'string' ||
    guessed.length <= 0 ||
    answear.length <= 0 ||
    guessed.length !== answear.length
  ) {
    return checkedArr;
  }

  let guessedArr = guessed.toLowerCase().split('');
  let answearArr = answear.toLowerCase().split('');
  let correctFilteredArr = [...answearArr];

  // Logic to set correct/incorrect letters in objArr and remove correct for next pass
  guessedArr.map((letter, index) => {
    const correct = letter === answearArr[index] ? true : false;
    correct
      ? checkedArr.push({ letter: letter, result: 'correct' })
      : checkedArr.push({ letter: letter, result: 'incorrect' });
    correct
      ? correctFilteredArr.splice(correctFilteredArr.indexOf(letter), 1)
      : null;
  });

  // Logic to check if any incorrect letters are misplaced and update values in objArr
  guessedArr.map((letter, index) => {
    const found = correctFilteredArr.indexOf(letter) >= 0 ? true : false;
    found && checkedArr[index].result !== 'correct'
      ? (checkedArr[index].result = 'misplaced')
      : null;
    found
      ? correctFilteredArr.splice(correctFilteredArr.indexOf(letter), 1)
      : null;
  });

  return checkedArr;
}

export default feedback;
