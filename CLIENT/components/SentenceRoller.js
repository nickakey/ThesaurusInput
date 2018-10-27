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
    }
  }

  getSynonyms(keyword){
      return new Promise((resolve, reject)=>{
        axios.get(`http://thesaurus.altervista.org/thesaurus/v1?word=${keyword}&language=en_US&output=json&key=yj7S3AHHSC5OTOF3rJhK`)
        .then((response)=>{
            //TODO - I am only choosing the first elemnet of the array, which is an issue... Since there may be more data
            resolve(synonymsFormatter(response.data.response[0].list.synonyms));
        })
        .catch((err)=>{
            console.log("this is an err ", err )
            reject(err);
        })
      })
  }

  handleKeyWordClick(keyword, index){
      this.getSynonyms(keyword)
      .then((synonyms)=>{
        this.setState({synonymsOfSelectedKeyWord: synonyms, selectedKeyWord: keyword, displaySynonymSelector: true})
      })   
      .catch((err)=>{
          console.log("an error has occurred while fetching synonyms, check your network connection and try again ", err);
      })
  }

  render() {
      if(this.state.displaySynonymSelector){
          return <SynonymSelector synonyms={this.state.synonymsOfSelectedKeyWord} keyword={this.state.selectedKeyWord}/>
      } else {
        return (
            <div>
                <form>
                    {this.state.keywords.map((keyword, index)=>{
                        return <span key={index} onClick={this.handleKeyWordClick.bind(this, keyword, index)}>{keyword}</span>
                    })}
                </form>
            </div>
          )
      }
  } 
}
export default SentenceRoller;


