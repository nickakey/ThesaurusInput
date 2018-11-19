/* eslint-disable */
import React from "react";
import { css, keyframes } from "react-emotion";
import ThesaurusLetter from "./ThesaurusLetter";
import importHelpers from "../helpers";
import { 
  placeHolderText, 
  dropDown, 
  spaceCSS,
  wordCSS,
  greenWordCSS,
  synonymCSS,
  input,
  blink,
  cursorBeforeElement
 } from "../styles/ThesaurusInput.style.js";

 class ThesaurusInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: [],
      synonyms: [],
      cursorAfter: { wordIndex: 0, characterIndex: 0 }, 
      maxLeft: true,
    };
    this.waitingWordRequests = {};
    importHelpers(this);
  } 

  render() {
    return (
      <div
        id={this.props.id ? this.props.id : input}
        data-testid="input"
        className={this.props.className ? this.props.className : input}
        autoFocus={this.props.autofocus ? this.props.autofocus : true}
        tabIndex="0"
        onKeyDown={(e) => {
          if (e.key === "Backspace") {
            this.handleDelete()
          } else if (e.key.slice(0,5) === "Arrow") {
            this.handleArrows(e.key.slice(5));
          } else {
            this.handleKeyboardInput(e.key);
          }
        }}
      >
      {this.state.words.length === 0 ? (
        <div id="placeHolder" className={`${placeHolderText} ${cursorBeforeElement}`}>
          {this.props.placeHolder ? this.props.placeHolder : "Start typing..."}
        </div>
      ) : null}

        {this.state.words.map((word, j) => {
          return word[0].value !== " " ? ( 
            <span 
              key={word[0].value + j}
              className={this.determineClassName(j, wordCSS, `${wordCSS} ${greenWordCSS}`)}
            >  
              {word.map((charObj, i) => {
                return (
                  <ThesaurusLetter
                    onClick={(...args) => {this.handleLetterClick(...args)}}
                    maxLeft={this.state.maxLeft}
                    cursorIndex={this.state.cursorAfter}
                    wordIndex={j}
                    key={charObj.value + i}
                    index={i}
                    charObj={charObj}
                  />
                )
              })}
              {this.state.synonyms[j] && this.state.synonyms[j].length > 0 ? (
                <span className={dropDown}>
                  {this.state.synonyms[j].map((synonym, k) => (
                    <div 
                      key={k}
                      onClick={()=>{this.handleSynonymClick(synonym, j)}}
                      className={synonymCSS}>
                      {synonym}
                    </div>
                  ))} 
                </span>) 
                : null
              }
            </span> ) : (
              <span 
              key={word[0].value + j}
              className={spaceCSS}>  
                {word.map((charObj, i) => {
                  return (
                    <ThesaurusLetter
                      onClick={(...args) => {this.handleLetterClick(...args)}}
                      maxLeft={this.state.maxLeft}
                      cursorIndex={this.state.cursorAfter}
                      wordIndex={j}
                      key={charObj.value + i}
                      index={i}
                      charObj={charObj}
                    />
                  )
                })}
              </span>
            )
        })}

      </div>
    );
  }
}


export default ThesaurusInput;