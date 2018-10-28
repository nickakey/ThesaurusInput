import SentenceRoller from "./SentenceRoller";
import KeyWordInputWindow from "./KeyWordInputWindow";
import React from 'react';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      keyWords: [],
      synonyms: {0: [], 1: [], 2: [], 3: []},
      keyWordsSubmitted: false
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
      keyWordsSubmitted: false
    })
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
            numberOfInputs={4}
            handleChange={this.handleKeyWordChange.bind(this)}
            handleSubmit={this.handleKeyWordSubmit.bind(this)}
          />
        </div>
      )
    }
  } 
}
export default App;

