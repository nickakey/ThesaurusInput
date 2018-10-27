import _ from "underscore";
import React from 'react';
import axios from "axios";
import SynonymSelector from "./SynonymSelector";
import { synonymsFormatter } from "../utilities";

class SentenceRoller extends React.Component {
  constructor(state) {
    super(state);
    this.state = {
        keywords: state.keywords,
        displaySynonymSelector: false,
        selectedKeyWord: null,
        synonymsOfSelectedKeyWord: [],
        selectedKeyWordIndex: null
    }
  }

  getSynonyms(keyword){
      return new Promise((resolve, reject)=>{
        axios.get(`http://thesaurus.altervista.org/thesaurus/v1?word=${keyword}&language=en_US&output=json&key=yj7S3AHHSC5OTOF3rJhK`)
        .then((response)=>{
            const formattedSynonyms = synonymsFormatter(response.data.response[0].list.synonyms)
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
          console.log("an error has occurred while fetching synonyms, check your network connection and try again ", err);
      })
  }

  handleSynonymClick(synonym){
      this.setState((state)=>{
          state.keywords[state.selectedKeyWordIndex] = synonym;
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
                /> 
                : ""
            }
            <form>
                {this.state.keywords.map((keyword, index)=>{
                    return <span key={index} onClick={this.handleKeyWordClick.bind(this, keyword, index)}>{keyword}</span>
                })}
            </form>
        </div>
        )
    }
} 
export default SentenceRoller;


