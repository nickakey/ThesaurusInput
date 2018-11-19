
export default function handleWordUpdate(state, wordIndex = this.state.cursorAfter.wordIndex) {
  state.synonyms[wordIndex] = [];
  const word = this.state.words[wordIndex];
  clearTimeout(this.waitingWordRequests["word" + wordIndex]);

  if (word && this.props.thesaurus !== false) {
    this.waitingWordRequests["word" + wordIndex] = setTimeout(() => {
      this.getSynonyms(this.convertWordArrayIntoString(word), wordIndex);
    }, 1000);
  }
}
  