
export default function handleDelete() {
  // TODO - I also have to handle the cursor
  if (this.state.maxLeft) {
    return;
  }

  const {
    words,
    cursorAfter: {
      wordIndex,
      characterIndex
    }
  } = this.state;
  const characterToDelete = words[wordIndex][characterIndex];
  const currentWord = words[wordIndex];
  const prevWord = words[wordIndex - 1];
  const nextWord = words[wordIndex + 1];
  const deletingSingleSpaceBetweenTwoWords = characterToDelete.value === " " && currentWord.length === 1 && prevWord && nextWord;
  const deletingLastLetterInWord = currentWord.length === 1;

  if (deletingSingleSpaceBetweenTwoWords) {
    return this.setState(state => {
      this.handleCursorMove(state, "Left");
      const combinedWords = [...prevWord, ...nextWord];
      state.words.splice(wordIndex - 1, 3, combinedWords);
      this.handleWordUpdate(state);
      return state;
    }, this.handleOnChangeCallback);
  }

  if (deletingLastLetterInWord) {
    return this.setState(state => {
      this.handleCursorMove(state, "Left");
      state.words.splice(wordIndex, 1);
      this.handleWordUpdate(state);
      return state;
    }, this.handleOnChangeCallback);
  } // if character has another character before it in the word, only delete that one character


  this.setState(state => {
    this.handleCursorMove(state, "Left");
    state.words[wordIndex].splice(characterIndex, 1);
    this.handleWordUpdate(state);
    return state;
  }, this.handleOnChangeCallback);
}
  