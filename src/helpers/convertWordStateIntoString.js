import convertWordArrayIntoString from './convertWordArrayIntoString';

export default function convertWordsStateIntoString(words) {
  return words.reduce((wordsString, word) => {
    return wordsString.concat(convertWordArrayIntoString(word));
  }, "");
}