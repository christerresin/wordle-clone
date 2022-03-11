import pickWord from './pickWord.js';
import { words } from './words.js';

/*
  TEST
  - if returned string length matches given length filter
  - if returned string does not havr no matching letters if norepeat filter is true
  - empty string is returned if no words arr is passed as param
  - empty string is returned if no words matched length filter param
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

const mockWordCase = ['STRONG'];
const mockWordsThree = ['try', 'ice'];
const mockWordsFive = ['sheep', 'trust'];
