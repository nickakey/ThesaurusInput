
export default function determineClassName(wordIndex, option1, option2) {
  if (this.state.synonyms[wordIndex] && this.state.synonyms[wordIndex].length > 0) {
    return option2;
  } 
  return option1;
}