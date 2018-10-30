import React from 'react';
import { css } from 'react-emotion';
import { injectGlobal } from 'emotion';
import axios from 'axios-jsonp-pro';
import { synonymsFormatter } from '../utilities';
import SentenceRoller from './SentenceRoller';
import KeyWordInputWindow from './KeyWordInputWindow';
import LoadingScreen from './LoadingScreen';

/* eslint-disable */
injectGlobal`
  * {
    @import url('https://fonts.googleapis.com/css?family=Work+Sans');
    font-family: 'Work Sans', sans-serif;
    box-sizing: border-box;    
    margin: 0px;
    padding: 0px;
    color: black;
  }
`
/* eslint-enable */

const background = css`
    background-image: linear-gradient(
        to right bottom,
        rgba(220, 76, 76, 0.8),
        rgba(190, 105, 60, 0.71)),
        url("https://images.pexels.com/photos/264635/pexels-photo-264635.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
    height: 100vh;
    width: 100vw;
    background-size: cover;
    background-position: center;
    clip-path: polygon(0 10%, 100% 10%, 100% 90%, 0 90% );
`;


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      keyWords: [],
      synonyms: [[], [], [], []],
      synonymsFetched: false,
      currentWord: [],
    };
  }

  static getSynonyms(keyWords) {
    console.log("this is keywords ", keyWords)
    return new Promise((resolve, reject) => {
      const allRequestPromises = keyWords.map((keyword) => {
        return axios.jsonp(`http://thesaurus.altervista.org/thesaurus/v1?word=${keyword}&language=en_US&output=json&key=yj7S3AHHSC5OTOF3rJhK`,
          { timeout: 1500 }).catch(() => undefined);
      });
      Promise.all(allRequestPromises)
        .then((results) => {
          const formattedSynonyms = synonymsFormatter(results);
          resolve(formattedSynonyms);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  getSynonym(keyword, index) {
    axios.jsonp(`http://thesaurus.altervista.org/thesaurus/v1?word=${keyword}&language=en_US&output=json&key=yj7S3AHHSC5OTOF3rJhK`,
      { timeout: 1500 })
      .then((result) => {
        this.setState((state) => {
          state.synonyms[index] = synonymsFormatter(result);
        })
      })
      .catch((err)=>{

      })
  }

  handleSynonymClick(synonym, selectedKeyWordIndex) {
    this.setState((state) => {
      const newState = Object.assign({}, state);
      newState.keyWords[selectedKeyWordIndex] = synonym;
      return newState;
    });
  }

  handleKeyboardInput(value) {
    if (value === ' ') {
      this.handleSpaceInput();
    } else {
      this.handleLetterInput(value);
    }
  }

  handleLetterInput(letter) {
    this.setState((state) => {
      state.currentWord.push(letter);
      return state;
    });
  }

  handleSpaceInput() {
    this.setState((state) => {
      const newWord = state.currentWord.join('');
      //kick off the async get synonym function... let it do it's thing in the background

      this.getSynonym(newWord, this.state.keyWords.length);
      state.keyWords.push(newWord);
      state.currentWord = [];
      return state;
    })
  }


  isFirstRender() {
    return this.state.keyWords.length === 0;
  }

  componentDidUpdate(){
    this.refs.keyPressHandler.focus();
  }

  componentDidMount(){
    this.refs.keyPressHandler.focus();
  }


  render() {
    return (
      <div className={background}>
        <span>
          <div>
          <div ref="keyPressHandler" autoFocus="true" tabIndex="0" onKeyPress={(e)=>{this.handleKeyboardInput(e.key)}}>input field</div>
            <SentenceRoller
              handleSynonymClick={(...args) => this.handleSynonymClick(...args)}
              keyWords={this.state.keyWords}
              handleNewSentence={(...args) => this.handleNewSentence(...args)}
              synonyms={this.state.synonyms}
            />
          </div>
        </span>
      </div>
    );
  }
}

export default App;
