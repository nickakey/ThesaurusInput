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
      numberOfWordSlots: 4,
      loading: false,
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

  handleSynonymClick(synonym, selectedKeyWordIndex) {
    this.setState((state) => {
      const newState = Object.assign({}, state);
      newState.keyWords[selectedKeyWordIndex] = synonym;
      return newState;
    });
  }

  handleKeyWordChange(value) {
    this.setState({ keyWords: value.split(' ') });
  }

  isFirstRender() {
    return this.state.keyWords.length === 0;
  }

  handleKeyWordSubmit() {
    if (this.state.keyWords.length > 0) {
      this.setState({ loading: true });
      App.getSynonyms(this.state.keyWords)
        .then((synonyms) => {
          this.setState({ synonymsFetched: true, synonyms, loading: false })
        })
    } else {
      alert('Enter at least 1 keyword before submitting')
    }
  }

  handleNewSentence() {
    this.setState({
      keyWords: [],
      synonyms: {
        0: [], 1: [], 2: [], 3: [],
      },
      synonymsFetched: false,
      numberOfWordSlots: 4,
    });
  }

  addNewWordSlot() {
    this.setState((state) => {
      const newState = Object.assign({}, state);
      newState.numberOfWordSlots += 1;
      return newState;
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <div className={background}>
          <LoadingScreen />
        </div>
      )
    }
    if (this.state.synonymsFetched) {
      return (
        <span>
          <div className={background} />
          <div>
            <SentenceRoller
              handleSynonymClick={(...args) => this.handleSynonymClick(...args)}
              keyWords={this.state.keyWords}
              handleNewSentence={(...args) => this.handleNewSentence(...args)}
              synonyms={this.state.synonyms}
            />
          </div>
        </span>
      );
    } return (
      <span>
        <div className={background} />
        <div>
          <KeyWordInputWindow
            // this stupid args things is a terrible pattern... 
            // TODO: Use bind or ANYTHING else
            handleChange={(...args) => this.handleKeyWordChange(...args)}
            handleSubmit={(...args) => this.handleKeyWordSubmit(...args)}
            addNewWordSlot={(...args) => this.addNewWordSlot(...args)}
            numberOfWordSlots={this.state.numberOfWordSlots}
          />
        </div>
      </span>
    );
  }
}

export default App;
