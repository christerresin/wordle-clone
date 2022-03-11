import feedback from './feedback';

/*

  TESTS
  - if words length dont match returned arr is empty
  - guessed word matches answear returned array objs key[result] all have value "correct"
  - returned array has same length as words
  - if words dont match returned arr objs contains result incorrect, correct or misplaces for letters
  - func is not case sensitive
  - returned arr is empty if guessed and/or answear string params are empty
*/

test('returned array is empty if guessed word and answear length dont match', () => {
  expect(feedback('five', 'one')).toEqual([]);
});

test('returned array is same length as guessed word and answear if words length match', () => {
  expect(feedback('qwerty', 'ytrewq').length).toBe(6);
});

test('guessed word "hålla" returns arr of objs with keys letter and result', () => {
  expect(feedback('hallå', 'cykla')).toEqual(resWrongWord);
});

test('guessed word is correct word returned arr objs result keys value are all "correct"', () => {
  expect(feedback('hallå', 'hallå')).toStrictEqual(resCorrectWord);
});

test('if func is case sensitive', () => {
  expect(feedback('YOUWIN', 'youwin')).toStrictEqual(caseSensitiveWord);
});

test('returned arr is empty if guessed word is not a string', () => {
  expect(feedback(5, 'test')).toEqual([]);
});

test('returned arr is empty if answear word is not a string', () => {
  expect(feedback('test', 3)).toEqual([]);
});

test('returned arr is empty if guessed string is empty', () => {
  expect(feedback('', 'test')).toEqual([]);
});

test('returned arr is empty if answear string is empty', () => {
  expect(feedback('test', '')).toEqual([]);
});

const resWrongWord = [
  {
    letter: 'h',
    result: 'incorrect',
  },
  {
    letter: 'a',
    result: 'misplaced',
  },
  {
    letter: 'l',
    result: 'incorrect',
  },
  {
    letter: 'l',
    result: 'correct',
  },
  {
    letter: 'å',
    result: 'incorrect',
  },
];

const resCorrectWord = [
  {
    letter: 'h',
    result: 'correct',
  },
  {
    letter: 'a',
    result: 'correct',
  },
  {
    letter: 'l',
    result: 'correct',
  },
  {
    letter: 'l',
    result: 'correct',
  },
  {
    letter: 'å',
    result: 'correct',
  },
];

const caseSensitiveWord = [
  {
    letter: 'y',
    result: 'correct',
  },
  {
    letter: 'o',
    result: 'correct',
  },
  {
    letter: 'u',
    result: 'correct',
  },
  {
    letter: 'w',
    result: 'correct',
  },
  {
    letter: 'i',
    result: 'correct',
  },
  {
    letter: 'n',
    result: 'correct',
  },
];
