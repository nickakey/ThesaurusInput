
export default function handleKeyboardInput(character) {
  const isNonCharacterInput = character.length > 1;
  const isSpaceBar = character === " ";

  if (isNonCharacterInput) {
    return;
  }

  if (isSpaceBar) {
    return this.handleSpaceBar();
  }

  const isAtMaxLeft = this.state.maxLeft;

  if (isAtMaxLeft) {
    return this.setState(state => {
      state.words.splice(0, 0, [{
        value: character
      }]);
      state.maxLeft = false;
      this.handleCursorMove(state, "Right");
      this.handleWordUpdate(state);
      return state;
    }, this.handleOnChangeCallback);
  }

  const {
    words,
    cursorAfter: {
      wordIndex,
      characterIndex
    }
  } = this.state;
  const prevCharacter = words[wordIndex][characterIndex];
  const spaceBeforeAndNoWordAfter = prevCharacter.value === " " && !words[wordIndex + 1];
  const spaceBeforeAndWordAfter = prevCharacter.value === " " && words[wordIndex + 1] && words[wordIndex + 1][0];

  if (spaceBeforeAndNoWordAfter) {
    return this.setState(state => {
      state.words.splice(wordIndex + 1, 0, [{
        value: character
      }]);
      this.handleCursorMove(state, "Right");
      this.handleWordUpdate(state);
      return state;
    }, this.handleOnChangeCallback);
  }

  if (spaceBeforeAndWordAfter) {
    return this.setState(state => {
      state.words[wordIndex + 1].splice(0, 0, {
        value: character
      });
      this.handleCursorMove(state, "Right");
      this.handleWordUpdate(state);
      return state;
    }, this.handleOnChangeCallback);
  } // else add to current word


  this.setState(state => {
    state.words[wordIndex].splice(characterIndex + 1, 0, {
      value: character
    });
    this.handleCursorMove(state, "Right");
    this.handleWordUpdate(state);
    return state;
  }, this.handleOnChangeCallback);
}
  