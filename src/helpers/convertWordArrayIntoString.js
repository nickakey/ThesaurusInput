
export default function convertWordArrayIntoString(word) {
  return word.reduce((wordString, letter) => wordString.concat(letter.value), "");
}
  