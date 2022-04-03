import pickWord from './server/pickWord.js';

/*
  TEST
  - if returned string length matches given length filter
  - if returned string length matches default param of 5
  - if norepeat default param is false
  - if returned string does not havr no matching letters if norepeat filter is true
  - empty string is returned if no words arr is passed as param
  - empty string is returned if no words matched length filter param

  With these test we check that the function returns a lower case string in all scenarios.
  If no length or norepeat filter is set default values are used.
  Length filter works and returned string matches given value.
  If norepeat filter is set to true the returned string does not have any repeated chars
*/

test('returned strings length is 5 and  matches given word length arg of 5', () => {
  expect(pickWord(mockWordsFive, 5).length).toBe(5);
});

test('returned strings length is 5 and  matches given word length arg of 5', () => {
  expect(pickWord(mockWordsThree, 3).length).toBe(3);
});

test('returned string has no matching chars if norepeat param is set to ture', () => {
  expect(pickWord(mockWordsFive, 5, true)).toEqual('trust');
});

test('returned string is empty if no arr of words is passed as first param', () => {
  expect(pickWord('noArr', 5, true)).toEqual('');
});

test('returned string is lower cased', () => {
  expect(pickWord(mockWordCase, 6, false)).toEqual('strong');
});

test('returned string is empty if no word in words arr matches length filter param', () => {
  expect(pickWord(mockWordsThree, 4)).toEqual('');
});

test('returned strings length matches default param value', () => {
  expect(pickWord(mockDefaultLength).length).toBe(5);
});

const mockWordCase = ['STRONG'];
const mockWordsThree = ['try', 'ice', 'theme'];
const mockWordsFive = ['sheep', 'trust', 'memory'];
const mockDefaultLength = ['computer', 'crash', 'ice'];
