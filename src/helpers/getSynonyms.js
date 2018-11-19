import axios from "axios-jsonp-pro";
export default function getSynonyms(word, wordIndex) {
  if (this.props.thesaurus === false) {
    return;
  }

  axios.jsonp(`http://thesaurus.altervista.org/thesaurus/v1?word=${word}&language=en_US&output=json&key=${this.props.apikey}`, {
    timeout: 3500
  }).then(result => {
    this.setState(state => {
      state.synonyms[wordIndex] = this.synonymsFormatter(result);
      return state;
    });
  }).catch(err => {// ADD BETTER ERROR HANDLING HERE
  });
}
  