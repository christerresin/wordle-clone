import checkWord from './checkWord';

test('returned array is empty if guessed word and answear length dont match', () => {
  expect(checkWord('five', 'one')).toEqual([]);
});

test('returned array is same length as guessed word and answear if words length match', () => {
  expect(checkWord('qwerty', 'ytrewq').length).toBe(6);
});

test('guessed word "hålla" returns arr of objs with keys letter and result', () => {
  expect(checkWord('hallå', 'cykla')).toEqual(resWrongWord);
});

test('guessed word is correct word returned arr objs result keys value are all "correct"', () => {
  expect(checkWord('hallå', 'hallå')).toStrictEqual(resCorrectWord);
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
