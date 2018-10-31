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

const input = css`
  position: absolute;
  top: 72%;
  right: 50%;
  transform: translate(50%, 50%);
  background-color: white;
  padding: 13px;
  width: 15rem;
  text-align: center;
  border-radius: 6px;
  border: solid grey 1.5px;
  height: 3.5rem;
  color: grey;
  &:focus {
    outline: none;
    box-shadow: 0 0 5pt 3pt rgb(0, 0, 0, .3);
  }
`

const welcomeMessage = css`
  position: absolute;
  top: 32%;
  right: 50%;
  transform: translate(50%, 50%);
  /* background-color: white; */
  /* padding: 13px; */
  /* width: 15rem; */
  /* text-align: center; */
  /* border-radius: 6px; */
  /* border: solid grey 1.5px; */
  height: 3.5rem;
  color: white;
  font-size: 4.3rem;
  width: 100%;
  text-align: center;  
`

const hintMessage = css`
  position: absolute;
  top: 30%;
  right: 23%;
  transform: translate(50%, 50%);
  height: 3.5rem;
  color: white;
  font-size: 1.6rem;
  width: 28%;
  text-align: center;  
`

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      keyWords: [],
      synonyms: [],
      currentWord: [],
      welcomeMessage: "Start Typing!",
      hintMessage: '',
    };
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
      newState.hintMessage = "";
      newState.keyWords[selectedKeyWordIndex] = synonym;
      return newState;
    });
  }

  handleKeyboardInput(value) {
    if (value === 'Backspace') {
      this.handleDeleteInput();
    } else if (value === ' ' || value === 'Enter') {
      this.setState({welcomeMessage: "", hintMessage: 'Hover over the word to choose a synonym!'})
      this.handleSpaceInput();
    } else {
      if(this.state.welcomeMessage === 'Start Typing!') {
        setTimeout(() => {this.setState({
          welcomeMessage: "Hit Enter to Save Word!",
        })
      }, 300)}
      this.handleLetterInput(value);
    }
  }

  handleDeleteInput() {
    this.setState((state)=>{
      state.currentWord.pop();
      return state;
    });
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
            <div className={hintMessage}>{this.state.hintMessage}</div>
            <div className={welcomeMessage}>{this.state.welcomeMessage}</div>
            <SentenceRoller
              handleSynonymClick={(...args) => this.handleSynonymClick(...args)}
              keyWords={this.state.keyWords}
              handleNewSentence={(...args) => this.handleNewSentence(...args)}
              synonyms={this.state.synonyms}
            />
            <div 
              className={input} 
              ref='keyPressHandler' 
              autoFocus='true' 
              tabIndex='0' 
              onKeyDown={(e)=>{if(e.key === "Backspace"){this.handleKeyboardInput(e.key)}}}
              onKeyPress={(e)=>{this.handleKeyboardInput(e.key)}}
            >
              {this.state.currentWord.join('')}
            </div>  
          </div>
        </span>
      </div>
    );
  }
}

export default App;
