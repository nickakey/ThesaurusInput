import React from 'react';
import { css, keyframes } from 'react-emotion';

const input = css`
  position: absolute;
  background-color: white;
  display: block;
  position: absolute;
  top: 40%;
  left: 50%; 
  transform: translate(-50%, -50%);
  padding: 20px;
  width: 50%;
  text-align: left;
  border-radius: 5px;
`

const character = css`
  background-color: white;
  font-size: 35px;
  color: black;
`

const blink = keyframes`
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
`

const elementBeforeCursor = css`
  &::after {
    content: "|";
    animation: ${blink} 1s linear infinite;
  };
  
`




class ThesaurusInput extends React.Component {
  constructor() {
    super();
    this.state = {
      characters: [
        {value: "H", cursorBefore: false},
        {value: "e", cursorBefore: false}, 
        {value: "y", cursorBefore: false},
        {value: " ", cursorBefore: false},
        {value: "END", cursorBefore: true},
      ],
      words: [],
      cursorBefore: 1, 
    };
    this.handleKeyboardInput = this.handleKeyboardInput.bind(this);
  }

  handleKeyboardInput(character) {
    console.log("we in here! ", character)
    this.setState((state) => {
      state.characters.splice( this.state.cursorBefore-1, 0, {value: character, cursorBefore: false} );
      state.cursorBefore += 1;
      return state;
    })
  }

  handleSpaceBar() {
    this.state.characters.splice( cursorBefore-1, 0, " " );
    this.state.cursorBefore += 1;
    this.addWord();
  }

  handleDelete() {
    this.state.characters.splice( cursorBefore-1, 1 );
    this.state.cursorBefore +- 1;
  } 

  handleArrowKeys() {
    //TODO 
  }  

  findSecondLastSpace(){}

  addWord() {
    //A word is the text between the last index, and the first space before it
    let secondLastSpace = this.findSecondLastSpace();
    let currentSpaceIndex = this.state.characters.length - 2;
    const wordCoords = [++secondLastSpace, --currentSpaceIndex];


  }

  render() {
    return (
      <div 
        className={input}
        autoFocus='true' 
        tabIndex='0' 
        onKeyPress={(e) => { this.handleKeyboardInput(e.key) }}
      >

        {this.state.characters.map((charObj, i) => {

          if (charObj.cursorBefore) {
            return (
              <span
              className={`${character} ${elementBeforeCursor}`}
              key={charObj.value + i}
              
              >
                {charObj.value}
              </span>

            )}
          return (
            <span
              className={character}
              key={charObj.value + i}
              
            >
              {charObj.value}
            </span>
          )
        }
        )}




      </div>
    );
  }
}

export default ThesaurusInput;


/*
- I can type letters and they will appear 
- AND the cursor will appear after the last  character I typed
- I can hit delete, and the character before my cursor will be deleted
- I can press the arrow keys and my cursor will shift left and right
- I can click on a character, and the cursor will appear on the left side of that character
- I can hit space, and after the item behind the cursor, but before the cursor, will appear a space


- Handle empty state
- 

*/
