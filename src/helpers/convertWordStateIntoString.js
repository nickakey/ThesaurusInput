import { convertWordArrayIntoString } from './convertWordArrayIntoString';

export function convertWordsStateIntoString(words) {
  return words.reduce((wordsString, word) => {
    return wordsString.concat(convertWordArrayIntoString(word));
  }, "");
}