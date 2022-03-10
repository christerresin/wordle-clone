import checkWord from './checkWord';

test('array is empty if guessed word and answear length dont match', () => {
  expect(checkWord('five', 'one')).toEqual([]);
});

test('array is same length as guessed word and answear if words length match', () => {
  expect(checkWord('qwerty', 'ytrewq').length).toBe(6);
});

test('guessed word "hålla" returns arr of objs with keys letter and result', () => {
  expect(checkWord('hallå', 'cykla')).toEqual(resHallå);
});

const resHallå = [
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
