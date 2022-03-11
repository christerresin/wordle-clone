function feedback(guessed, answear) {
  /*
    Check if guessed word is the answear
      - Inputs are strings
      - Make arr of guessed, answear and checked
      - loop over guessed once and create arr of obj with letter, result > incorrect, correct. remove any correct letters from answearArr
      - loop over guessed again and find misplaced letters by index, update obj.result with missplaced for letter and remove letter from answear arr
    Return Arr
  */

  let checkedArr = [];

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
      : '';
  });

  // Logic to check if any incorrect letters are misplaced and update values in objArr
  guessedArr.map((letter, index) => {
    const found = correctFilteredArr.indexOf(letter) >= 0 ? true : false;
    found ? (checkedArr[index].result = 'misplaced') : '';
    found
      ? correctFilteredArr.splice(correctFilteredArr.indexOf(letter), 1)
      : '';
  });

  return checkedArr;
}

export default feedback;
