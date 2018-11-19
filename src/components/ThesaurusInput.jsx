
/* eslint-disable */
import React from "react";
import importHelpers from "../helpers";
import { 
  placeHolderText, 
  input,
  cursorBeforeElement
 } from "../styles/ThesaurusInput.style.js";
import Word from "./Word.jsx"
import PlaceHolder from "./Placeholder.jsx"

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
          <PlaceHolder customPlaceholder={this.props.placeHolder}/>
        ) : null}

        {this.state.words.map((word, j) => (
          <Word 
            word={word}
            determineClassName={this.determineClassName}
            handleLetterClick={this.handleLetterClick}
            maxLeft={this.state.maxLeft}
            cursorAfter={this.state.cursorAfter}
            wordIndex={j}
            synonyms={this.state.synonyms[j]}
            handleSynonymClick={this.handleSynonymClick}
          />
        ))}
      </div>
    );
  }
}


export default ThesaurusInput;