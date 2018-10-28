import _ from "underscore";
import React from 'react';
import axios from "axios-jsonp-pro";
import SynonymSelector from "./SynonymSelector";
import { synonymsFormatter } from "../utilities";

class SentenceRoller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        keyWords: props.keyWords,
        displaySynonymSelector: false,
        selectedKeyWord: null,
        synonymsOfSelectedKeyWord: [],
        selectedKeyWordIndex: null
    }
  }

  getSynonyms(keyword){
      return new Promise((resolve, reject)=>{
        axios.jsonp(`http://thesaurus.altervista.org/thesaurus/v1?word=${keyword}&language=en_US&output=json&key=yj7S3AHHSC5OTOF3rJhK`, 
            {timeout: 2500}
        )
        .then(({response})=>{
            console.log("this is the response... " ,response)
            const formattedSynonyms = synonymsFormatter(response)
            resolve(formattedSynonyms);
        })
        .catch((err)=>{
            reject(err);
        })
      })
  }

  handleKeyWordClick(keyword, index){
      console.log("handle keyword click is firing");
      this.getSynonyms(keyword)
      .then((synonyms)=>{
        this.setState({
            synonymsOfSelectedKeyWord: synonyms, 
            selectedKeyWord: keyword, 
            displaySynonymSelector: true,
            selectedKeyWordIndex: index
        })
      })   
      .catch((err)=>{
        if(err.toString().includes("Request timed out")){alert("We could not find any synonyms for this word... Please try again")} else {
            alert("an error has occurred while fetching synonyms, please check your network connection and try again ");
        }
      })
  }

  handleSynonymClick(synonym){
      this.setState(
        (state)=>{state.keyWords[state.selectedKeyWordIndex] = synonym},
        ()=>{this.closeSynonymMenu()}
      )
  }

  closeSynonymMenu(){
    this.setState((state)=>{
        state.displaySynonymSelector = false;
        state.selectedKeyWord = null;
        state.synonymsOfSelectedKeyWord = [];
        state.selectedKeyWordIndex = null;
    })
}  

  render() {
    return (
        <div>
            {this.state.displaySynonymSelector ? 
                <SynonymSelector 
                    handleSynonymClick={this.handleSynonymClick.bind(this)}
                    synonyms={this.state.synonymsOfSelectedKeyWord} 
                    keyword={this.state.selectedKeyWord}
                    handleCloseMenu={this.closeSynonymMenu.bind(this)}
                /> 
                : ""
            }
            <form>
                {this.state.keyWords.map((keyword, index)=>{
                    return <span key={index} onClick={this.handleKeyWordClick.bind(this, keyword, index)}>{keyword}</span>
                })}
            </form>
            <span onClick={this.props.handleNewSentence}>New Sentence</span>

        </div>
        )
    }
} 
export default SentenceRoller;


