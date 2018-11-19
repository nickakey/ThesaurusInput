
export default function handleSpaceBar() {
  const {
    words,
    cursorAfter: {
      wordIndex,
      characterIndex
    }
  } = this.state;
  const isAtMaxLeft = this.state.maxLeft;

  if (isAtMaxLeft) {
    return this.setState(state => {
      state.words.unshift([{
        value: " "
      }]);
      this.handleCursorMove(state, "Right");
      state.maxLeft = false;
      return state;
    }, this.handleOnChangeCallback);
  }

  const prevCharacter = words[wordIndex][characterIndex];
  const nextCharacter = words[wordIndex][characterIndex + 1];
  const prevCharacterIsSpace = prevCharacter.value === " ";
  const firstCharacterInNextWordIsSpace = !nextCharacter && words[wordIndex + 1] && words[wordIndex + 1][0].value === " ";
  const addingSpaceToMiddleOfWord = nextCharacter;

  if (prevCharacterIsSpace) {
    return this.setState(state => {
      state.words[wordIndex].push({
        value: " "
      });
      this.handleCursorMove(state, "Right");
      return state;
    }, this.handleOnChangeCallback);
  }

  if (firstCharacterInNextWordIsSpace) {
    return this.setState(state => {
      state.words[wordIndex + 1].unshift({
        value: " "
      });
      this.handleCursorMove(state, "Right");
      return state;
    }, this.handleOnChangeCallback);
  }

  if (addingSpaceToMiddleOfWord) {
    // this should make a change request for both words.
    return this.setState(state => {
      const newWord = state.words[wordIndex].splice(characterIndex + 1);
      state.words.splice(wordIndex + 1, 0, [{
        value: " "
      }], newWord);
      this.handleCursorMove(state, "Right");
      this.handleWordUpdate(state, this.state.cursorAfter.wordIndex + 1);
      this.handleWordUpdate(state, this.state.cursorAfter.wordIndex - 1);
      return state;
    }, this.handleOnChangeCallback);
  }

  this.setState(state => {
    state.words.splice(wordIndex + 1, 0, [{
      value: " "
    }]);
    this.handleCursorMove(state, "Right");
    return state;
  }, this.handleOnChangeCallback);
}
  