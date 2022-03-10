function pickWord(wordArr, wordLength, norepeat) {
  /*
    Needs to return a random word based on array of words, filtered by length and/or repeated letters in the word
    - Verify args are correct
    - filter down words to match wordLength arg
    - filter out any words with repeating letters if norepeat
    - pick a random word and return

  */

  let pickedWord = '';
  let filteredWordsArr = [];

  if (
    wordArr.length < 1 &&
    wordLength !== typeof 'number' &&
    norepeat !== typeof 'boolean'
  ) {
    return pickedWord;
  }

  wordArr = wordArr.filter((word) => word.length === wordLength);

  wordArr.map((word) => {
    filteredWordsArr.push(
      word
        .split('')
        .sort((a, b) => a.localeCompare(b))
        .join('')
    );
  });

  filteredWordsArr.map((word, index) => {
    word.split('').map((letter, i) => {
      letter === word[i + 1] ? filteredWordsArr.splice(index, 1) : '';
    });
  });
}

export default pickWord;
