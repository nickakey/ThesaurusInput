import React from 'react';
import { css, keyframes } from 'react-emotion';
import ThesaurusLetter from './ThesaurusLetter';

function logState(){
  console.log("this is the state ", this.state)

}

const input = css`
  position: absolute;
  background-color: white;
  display: block;
  position: absolute;
  top: 40%;
  left: 50%; 
  transform: translate(-50%, -50%);
  padding: 20px;
  width: 51%;
  text-align: left;
  border-radius: 5px;
  overflow: scroll;
`
class ThesaurusInput extends React.Component {
  constructor() {
    super();
    this.state = {
      words: [
        [
          { value: 't', cursorAfter: false },
          { value: 'y', cursorAfter: false },
          { value: 'p', cursorAfter: false },
          { value: 'e', cursorAfter: false },
        ],
        [
          { value: ' ', cursorAfter: false },
        ],
        [
          { value: 'H', cursorAfter: false },
          { value: 'e', cursorAfter: false },
          { value: 'r', cursorAfter: false },
          { value: 'e', cursorAfter: true },
        ],
      ],
      cursorAfter: { wordIndex: 2, letterIndex: 3 }, 
    };
    this.handleKeyboardInput = this.handleKeyboardInput.bind(this);
  }

  advanceCursor(state) {
    const { words, cursorAfter, cursorAfter: { wordIndex, letterIndex } } = state;
    const currentLetter =  words[wordIndex][letterIndex];
    const nextLetter =  words[wordIndex][letterIndex+1];
    
    if(!nextLetter){
      //case 1, if no next letter, cursor is at end of word
      currentLetter.cursorAfter = false;
      cursorAfter.wordIndex += 1;
      cursorAfter.letterIndex = 0;
    } else {
      //case 2, else cursor is at middle of word
      currentLetter.cursorAfter = false;
      cursorAfter.letterIndex += 1;
    }
  }

  handleSpaceBar() {
    this.setState((state) => {
      const { words, cursorAfter: {wordIndex, letterIndex} } = state;
      // if the last character is spacebar, then just add to current word
      if(words[wordIndex][letterIndex].value === " "){
        words[wordIndex].push({ value: ' ', cursorAfter: true });
        this.advanceCursor(state);
        return state;
      //If the last character is a letter, start a new word
      } else {
        words.push([{ value: ' ', cursorAfter: true }])
        this.advanceCursor(state);
        return state;
      }
    }, logState);
  }

  handleKeyboardInput(character) {

    if (character.length > 1){ return }
    if (character === " "){ return this.handleSpaceBar(); } 

    this.setState((state) => {    
      const { words, cursorAfter, cursorAfter: { wordIndex, letterIndex } } = state;
      const currentLetter =  words[wordIndex][letterIndex];
      const nextLetter =  words[wordIndex][letterIndex+1];

      if(currentLetter.value === " "){
        console.log("we are in the if!")
        //if current character is space, start a new word
        words.splice(wordIndex + 1, 0, [{ value: character, cursorAfter: true }])
        this.advanceCursor(state);
        return state;
      } else {
        //else add to current word
        words[wordIndex].splice(letterIndex + 1, 0, { value: character, cursorAfter: true })
        this.advanceCursor(state);
        return state;
      }
      
    }, logState)
  }


  handleDelete() {
    // this.setState((state) => {
    //   state.words.splice( state.cursorAfter, 1 );
    //   state.words[state.cursorAfter - 1].cursorAfter = true;
    //   state.cursorAfter -= 1;
    //   return state;
    // })

  } 


  handleArrows(direction) {
    // if(direction === 'Right') {
    //   this.setState((state) => {
    //     if(this.state.cursorAfter === this.state.words.length - 1){return}
    //     state.words[state.cursorAfter].cursorAfter = false;
    //     state.words[state.cursorAfter + 1].cursorAfter = true;
    //     state.cursorAfter += 1;
    //     return state;
    //   })
    // }    
    
    // if(direction === 'Left') {
    //   this.setState((state) => {
    //     if(this.state.cursorAfter === 0){return}
    //     state.words[state.cursorAfter].cursorAfter = false;
    //     state.words[state.cursorAfter - 1].cursorAfter = true;
    //     state.cursorAfter -= 1;
    //     return state;
    //   })
    // }
  } 
  

  handleClick(index) {
    // this.setState((state) => { 
    //   state.words[state.cursorAfter - 1].cursorAfter = false;
    //   state.cursorAfter = index;
    //   state.words[index].cursorAfter = true;
    //   return state;
    // })
  }

  addWord() {
    //A word is the text between the last index, and the first space before it
    // let secondLastSpace = this.findSecondLastSpace();
    // let currentSpaceIndex = this.state.words.length - 2;
    // const wordCoords = [++secondLastSpace, --currentSpaceIndex];


  }

  render() {
    return (
      <div 
        className={input}
        autoFocus='true' 
        tabIndex='0' 
        onKeyPress={(e) => { this.handleKeyboardInput(e.key); }}
        onKeyDown={(e) => {
          if(e.key === "Backspace") {
            this.handleDelete()
          }
          if(e.key.slice(0,5) === "Arrow") {
            this.handleArrows(e.key.slice(5));
          }
        }}
      >

        {this.state.words.map((word, i) => {
          return word.map((charObj, i) => (
            <ThesaurusLetter
              key={charObj.value + i}
              index={i}
              charObj={charObj}
              onClick={this.handleClick.bind(this)}
            />
          ))
        })}

      </div>
    );
  }
}

export default ThesaurusInput;

 
/*
The state should match the following requirements
   * it should organize letters together into words
   * It should allow multiple spaces to be typed in a row
   * It should allow the cursor to be moved 
*/



/*
1: one letter existing
  a: space
  b: another character

2: one space existing
  a: space 
  b: another character

*/ 


//on space,
  //if the last element of the last word ends in ' ' 
    //it adds that space to the end of the last word
  //else 
    //create a new word




/* 
  A WORD
  - the index of the first letter and the second letter
  - The list of thesaurus words 
  - Then, the word has a marker on it that's like "hasSynonyms : Yes"
    - And if it's true that it does, then we render an extra element
    _ And we figure out the position of that element by knowing how wide a single letter index is


*/


/*
- I can type letters and they will appear 
- I can click on a character, and the cursor will appear on the left side of that character
- I can hit delete, and the character before my cursor will be deleted
- I can press the arrow keys and my cursor will shift left and righ
- I can hit space, and after the item behind the cursor, but before the cursor, will appear a space
- AND the cursor will appear after the last  character I typed


- Handle empty state
- 

*/
