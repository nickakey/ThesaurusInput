import { handleCursorMove } from './../helpers/handleCursorMove';
import { synonymsFormatter } from './../helpers/synonymsFormatter';
import { splitStringIntoLettersArray } from './../helpers/splitStringIntoLettersArray';
import { convertWordArrayIntoString } from './../helpers/convertWordArrayIntoString';
import { convertWordsStateIntoString } from './../helpers/convertWordStateIntoString';
/* eslint-disable */
import React from "react";
import { css, keyframes } from "react-emotion";
import axios from "axios-jsonp-pro";
import ThesaurusLetter from "./ThesaurusLetter";
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

function logState() {
  console.log("this is the state ", this.state);
}

const waitingWordRequests = {};


class ThesaurusInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      words: [],
      synonyms: [],
      cursorAfter: { wordIndex: 0, characterIndex: 0 }, 
      maxLeft: true,
    };
    this.handleKeyboardInput = this.handleKeyboardInput.bind(this);
  }

  handleOnChangeCallback(){
    this.props.onChange(convertWordsStateIntoString(this.state.words));
  }

  getSynonyms(word, wordIndex) {  
    if(this.props.thesaurus === false){return}
    axios.jsonp(`http://thesaurus.altervista.org/thesaurus/v1?word=${word}&language=en_US&output=json&key=${this.props.apikey}`,
      { timeout: 3500 })
      .then((result) => {
        this.setState((state) => {
          state.synonyms[wordIndex] = synonymsFormatter(result);
          return state;
        });
      })
      .catch((err)=>{
        // ADD BETTER ERROR HANDLING HERE
      })    
  }



  determineClassName(wordIndex) {
    if(!this.state.synonyms[wordIndex]) {
      return wordCSS;
    }
    if(this.state.synonyms[wordIndex].length > 0) {
      return `${wordCSS} ${greenWordCSS}`
    } else {
      return wordCSS;
    }
  }    

  handleWordUpdate(state, wordIndex = this.state.cursorAfter.wordIndex) {
    state.synonyms[wordIndex] = [];
    const word = this.state.words[wordIndex];
    clearTimeout(waitingWordRequests["word" + wordIndex]);
    if(word && this.props.thesaurus !== false){

      waitingWordRequests["word" + wordIndex] = setTimeout(() => {
        this.getSynonyms(convertWordArrayIntoString(word), wordIndex)
      }, 1000)
    }
  }



  handleSynonymClick(synonym, wordIndex) {
    this.setState((state) => {
      state.words[wordIndex] = splitStringIntoLettersArray(synonym);
      if (state.cursorAfter.wordIndex === wordIndex) {
        state.cursorAfter.characterIndex = synonym.length - 1;
      }
      this.handleWordUpdate(state, wordIndex);
      return state;
    }, this.handleOnChangeCallback);
  }

  handleSpaceBar() {
    const { words, cursorAfter: { wordIndex, characterIndex } } = this.state;
    const isAtMaxLeft = this.state.maxLeft;

    if (isAtMaxLeft) {
      return this.setState((state)=>{
        state.words.unshift([{ value: " " }])
        handleCursorMove(state, "Right");
        state.maxLeft = false;
        return state;
      }, this.handleOnChangeCallback);
    }      

    const prevCharacter = words[wordIndex][characterIndex];
    const nextCharacter = words[wordIndex][characterIndex + 1];

    const prevCharacterIsSpace = prevCharacter.value === " ";
    const firstCharacterInNextWordIsSpace = !nextCharacter && words[wordIndex + 1] && words[wordIndex + 1][0].value === " ";
    const addingSpaceToMiddleOfWord = nextCharacter;

    if (prevCharacterIsSpace) {
      return this.setState((state)=>{
        state.words[wordIndex].push({ value: " " });
        handleCursorMove(state, "Right");
        return state;
      }, this.handleOnChangeCallback);
    }

    if (firstCharacterInNextWordIsSpace) {
      return this.setState((state)=>{
        state.words[wordIndex + 1].unshift({ value: " " });
        handleCursorMove(state, "Right");
        return state;
      }, this.handleOnChangeCallback);
      

    }
    if (addingSpaceToMiddleOfWord) {
      // this should make a change request for both words.
      return this.setState((state)=>{
        const newWord = state.words[wordIndex].splice(characterIndex + 1)
        state.words.splice(wordIndex + 1, 0, [{ value: " " }], newWord);
        handleCursorMove(state, "Right");
        this.handleWordUpdate(state, this.state.cursorAfter.wordIndex + 1)
        this.handleWordUpdate(state, this.state.cursorAfter.wordIndex - 1)
        return state;
      }, this.handleOnChangeCallback);
    }

    this.setState((state)=>{
      state.words.splice(wordIndex + 1, 0, [{ value: " " }]);
      handleCursorMove(state, "Right");
      return state;
    }, this.handleOnChangeCallback);
    // this.getSynonyms(convertWordArrayIntoString(words[wordIndex]), wordIndex);
  }



  handleKeyboardInput(character) {
    const isNonCharacterInput = character.length > 1;
    const isSpaceBar = character === " ";
    
    if (isNonCharacterInput) { return; }
    if (isSpaceBar) { return this.handleSpaceBar(); } 
    

    const isAtMaxLeft = this.state.maxLeft;

    if (isAtMaxLeft) {
      return this.setState((state) => {
        state.words.splice(0, 0, [{ value: character }]);
        state.maxLeft = false;
        handleCursorMove(state, "Right");
        this.handleWordUpdate(state);
        return state;
      }, this.handleOnChangeCallback);
    }  

    const { words, cursorAfter: { wordIndex, characterIndex } } = this.state;
    const prevCharacter = words[wordIndex][characterIndex];
    
    const spaceBeforeAndNoWordAfter = prevCharacter.value === " " && (!words[wordIndex + 1]);
    const spaceBeforeAndWordAfter = prevCharacter.value === " " && (words[wordIndex + 1] && words[wordIndex + 1][0]);

    if (spaceBeforeAndNoWordAfter) {
      return this.setState((state) => {
        state.words.splice(wordIndex + 1, 0, [{ value: character }])
        handleCursorMove(state, "Right");
        this.handleWordUpdate(state)
        return state;
      }, this.handleOnChangeCallback);
    } 

    if (spaceBeforeAndWordAfter) {
      return this.setState((state) => {
        state.words[wordIndex + 1].splice(0, 0, { value: character })
        handleCursorMove(state, "Right");
        this.handleWordUpdate(state)
        return state;
      }, this.handleOnChangeCallback);
    }

    // else add to current word
    this.setState((state)=>{              
      state.words[wordIndex].splice(characterIndex + 1, 0, { value: character })
      handleCursorMove(state, "Right");
      this.handleWordUpdate(state);
      return state;
    }, this.handleOnChangeCallback);
  }


  handleDelete() {
    // TODO - I also have to handle the cursor

    if (this.state.maxLeft){ return }

    const { words, cursorAfter: { wordIndex, characterIndex } } = this.state;
    const characterToDelete = words[wordIndex][characterIndex];
    const currentWord = words[wordIndex];
    const prevWord = words[wordIndex - 1];
    const nextWord = words[wordIndex + 1];

    const deletingSingleSpaceBetweenTwoWords = characterToDelete.value === " " && currentWord.length === 1 && prevWord && nextWord;
    const deletingLastLetterInWord = currentWord.length === 1;

    if (deletingSingleSpaceBetweenTwoWords) {
      return this.setState((state)=>{
        handleCursorMove(state, "Left")
        const combinedWords = [...prevWord, ...nextWord];
        state.words.splice(wordIndex - 1, 3, combinedWords);
        this.handleWordUpdate(state)
        return state;
      }, this.handleOnChangeCallback);
    } 

    if (deletingLastLetterInWord) {
      return this.setState((state)=>{
        handleCursorMove(state, "Left")
        state.words.splice(wordIndex, 1);
        this.handleWordUpdate(state)
        return state;
      }, this.handleOnChangeCallback);
    }

    // if character has another character before it in the word, only delete that one character
    this.setState((state)=>{
      handleCursorMove(state, "Left")
      state.words[wordIndex].splice(characterIndex, 1);
      this.handleWordUpdate(state)
      return state;
    }, this.handleOnChangeCallback);
  } 


  handleArrows(direction) {
    if(direction === "Left" || direction === "Right") {
      if (this.state.words.length === 0) { return; }
      this.setState((state) => {
        handleCursorMove(state, direction);
        return state;
      })
    }

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
              className={this.determineClassName(j)}
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