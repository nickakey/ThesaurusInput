import React from 'react';
import { css } from 'react-emotion';

const input = css`
  position: absolute;
  background-color: white;
  color: black;
  display: block;
  position: absolute;
  top: 40%;
  left: 50%; 
  transform: translate(-50%, -50%);
  padding: 20px;
  width: 50%;
  text-align: left;
  border-radius: 5px;
  font-size: 35px;
`

class ThesaurusInput extends React.Component {
  constructor() {
    super();
    this.state = {
      characters: [
        //The time complexity of this is going to be a little bad on insert / remove
        //But since the input field is so small it shouldn't matter too much
        {value: "H", cursorBefore: false},
        {value: "e", cursorBefore: false}, 
        {value: "y", cursorBefore: false},
        {value: " ", cursorBefore: false},
        {value: "END", cursorBefore: true},
      ],
      words: [
        
      ],
      cursorBefore: 1, 
    };
  }

  handleKeyboardInput(character) {
    //These will obviously be in a set state....
    this.state.characters.splice( cursorBefore-1, 0, character );
    this.state.cursorBefore += 1;
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
      <div className={input}>
        Hello I am thesarusus
      </div>
    );
  }
}

export default ThesaurusInput;


/*
- I can type words and they will appear 
  AND the cursor will appear after the last  character I typed
- I can hit delete, and the character before my cursor will be deleted
- I can press the arrow keys and my cursor will shift left and right
- I can click on a character, and the cursor will appear on the left side of that character
- I can hit space, and after the item behind the cursor, but before the cursor, will appear a space


- Handle empty state
- 

*/
