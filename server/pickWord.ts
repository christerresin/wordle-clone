function pickWord(wordArr: string[], wordLength = 5, norepeat = false) {
  /*
    Needs to return a random word based on array of words, filtered by length and/or repeated letters in the word
    - Verify args are correct
    - filter down words to match wordLength arg
    - filter out any words with repeating letters if norepeat
    - pick a random word and return

  */

  let pickedWord = '';
  let filteredWordsArr: String[] = [];

  // Conditionals for args
  if (wordArr.length < 1 || typeof wordArr !== 'object') {
    return pickedWord;
  }

  // Length filter for words Arr
  wordArr = wordArr.filter((word) => word.length === wordLength);

  // Norepeat filter for words Arr to remove all words that includes matching chars
  if (norepeat) {
    // Sort word ascend
    wordArr.map((word) => {
      filteredWordsArr.push(
        word
          .split('')
          .sort((a, b) => a.localeCompare(b))
          .join('')
      );
    });
    // Compare chars for equal value and filter
    filteredWordsArr.map((word, index) => {
      word.split('').map((letter, i) => {
        const match = letter === word[i + 1] ? true : false;
        match === true ? filteredWordsArr.splice(index, 1) : '';
        match === true ? wordArr.splice(index, 1) : '';
      });
    });
  }

  // Randomizer
  pickedWord = wordArr[Math.floor(Math.random() * wordArr.length)];

  return pickedWord ? pickedWord.toLowerCase() : '';
}

export default pickWord;
