function feedback(guessed, answear) {
  /*
    Check if guessed word is the answear
      - Make arr of guessed, answear and checked
      - loop over guessed once and create arr of obj with letter, result > incorrect, correct. remove any correct letters from answearArr
      - loop over guessed again and find misplaced letters by index, update obj.result with missplaced for letter and remove letter from answear arr
    Return Arr
  */

  let guessedArr = guessed.toLowerCase().split('');
  let answearArr = answear.toLowerCase().split('');
  let correctFilteredArr = [...answearArr];
  let checkedArr = [];

  if (guessed.length !== answear.length) {
    return checkedArr;
  }

  guessedArr.map((letter, index) => {
    const correct = letter === answearArr[index] ? true : false;
    correct
      ? checkedArr.push({ letter: letter, result: 'correct' })
      : checkedArr.push({ letter: letter, result: 'incorrect' });
    correct
      ? correctFilteredArr.splice(correctFilteredArr.indexOf(letter), 1)
      : '';
  });

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
