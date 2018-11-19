
export default function handleSynonymClick(synonym, wordIndex) {
  this.setState(state => {
    state.words[wordIndex] = this.splitStringIntoLettersArray(synonym);

    if (state.cursorAfter.wordIndex === wordIndex) {
      state.cursorAfter.characterIndex = synonym.length - 1;
    }

    this.handleWordUpdate(state, wordIndex);
    return state;
  }, this.handleOnChangeCallback);
}
  