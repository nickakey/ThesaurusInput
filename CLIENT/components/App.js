import SentenceRoller from "./SentenceRoller";
import KeyWordInputWindow from "./KeyWordInputWindow";
import React from 'react';
import styled, { css } from 'react-emotion';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      keyWords: [],
      synonyms: {0: [], 1: [], 2: [], 3: []},
      keyWordsSubmitted: false,
      numberOfWordSlots: 4,
    };
  }

  isFirstRender(){
    return this.state.keyWords.length === 0
  }

  handleKeyWordChange(index, value){
    this.setState((state)=>{
      state.keyWords[index] = value;
      console.log(this.state)
      return state;
    })
  }

  handleKeyWordSubmit(){
    if(this.state.keyWords.length > 0){
      this.setState({keyWordsSubmitted: true})
    } else {
      alert("Enter at least 1 keyword before submitting")
    }
  }

  handleNewSentence(){
    this.setState({
      keyWords: [],
      synonyms: {0: [], 1: [], 2: [], 3: []},
      keyWordsSubmitted: false,
      numberOfWordSlots: 4,
    })
  }

  addNewWordSlot(){
    this.setState((state)=>{state.numberOfWordSlots++; return state})
  }

  render() {
    if(this.state.keyWordsSubmitted){
      return (
        <div>
          <SentenceRoller 
            keyWords={this.state.keyWords}
            handleNewSentence={this.handleNewSentence.bind(this)}
          />
        </div>
      )   
    } else {
      return (
        <div>
          <KeyWordInputWindow 
            handleChange={this.handleKeyWordChange.bind(this)}
            handleSubmit={this.handleKeyWordSubmit.bind(this)}
            addNewWordSlot={this.addNewWordSlot.bind(this)}
            numberOfWordSlots={this.state.numberOfWordSlots}
          />
        </div>
      )
    }
  } 
}
export default App;

