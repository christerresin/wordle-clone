function checkWord(guessed, answear) {
  /*
    Check if guessed word is the answear
      - Make arr of guessed, answear and checked
      - loop over guessed once and create arr of obj with letter, result > incorrect, correct. remove any correct letters from answearArr
      - loop over guessed again and find misplaced letters by index, update obj.result with missplaced for letter and remove letter from answear arr
    Return Arr
  */

  let guessedArr = guessed.toLowerCase().split('');
  let answearArr = answear.toLowerCase().split('');
  let checkedArr = [];

  if (guessed.length !== answear.length) {
    return checkedArr;
  }

  guessedArr.map((letter, index) => {
    const correct = letter === answearArr[index] ? true : false;
    correct
      ? checkedArr.push({ letter: letter, result: 'correct' })
      : checkedArr.push({ letter: letter, result: 'incorrect' });
    correct ? answearArr.splice(index, 1) : '';
  });

  guessedArr.map((letter, index) => {
    const found = answearArr.indexOf(letter) >= 0 ? true : false;
    // console.log(checkedArr[index].letter);
    found ? (checkedArr[index].result = 'misplaced') : '';
    found ? answearArr.splice(answearArr.indexOf(letter), 1) : '';
    // console.log(answearArr);
  });

  // console.log(guessedArr);
  // console.log(answearArr);
  // console.log(checkedArr);

  return checkedArr;
}

// checkWord('hallå', 'cykla');
// checkWord('asd', 'dsa')

export default checkWord;
