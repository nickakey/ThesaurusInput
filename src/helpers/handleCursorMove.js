
export default function handleCursorMove(state, direction) {
  const directionIncrement = direction === "Right" ? 1 : -1;
  const {
    words,
    maxLeft,
    cursorAfter,
    cursorAfter: {
      wordIndex,
      characterIndex
    }
  } = state;
  const adjacentLetter = words[wordIndex][characterIndex + directionIncrement];
  const pressingRightWhenAlreadyRight = !adjacentLetter && !words[wordIndex + 1] && direction === "Right";
  const pressingLeftWhenAlreadyLeft = direction === "Left" && wordIndex === 0 && characterIndex === 0;
  const pressingRightWhenMaxLeft = direction === "Right" && maxLeft;
  const noMoreLettersInWord = !adjacentLetter;

  if (pressingRightWhenAlreadyRight) {
    return;
  }

  if (pressingLeftWhenAlreadyLeft) {
    state.maxLeft = true;
    return;
  }

  if (pressingRightWhenMaxLeft) {
    state.maxLeft = false;
    return;
  }

  if (noMoreLettersInWord) {
    state.maxLeft = false;
    const indexOfLetterInAdjacentWord = direction === "Right" ? 0 : words[wordIndex - 1].length - 1;
    cursorAfter.wordIndex += directionIncrement;
    cursorAfter.characterIndex = indexOfLetterInAdjacentWord;
    return;
  }

  state.maxLeft = false;
  cursorAfter.characterIndex += directionIncrement;
}
  