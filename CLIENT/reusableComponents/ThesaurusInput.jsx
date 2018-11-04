import React from 'react';
import { css, keyframes } from 'react-emotion';
import ThesaurusLetter from './ThesaurusLetter';
import { S_IFSOCK } from 'constants';

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
      characters: [
        { value: 'H', cursorAfter: false },
        { value: 'e', cursorAfter: false },
        { value: 'y', cursorAfter: true },
      ],
      words: [],
      cursorAfter: 2, 
    };
    this.handleKeyboardInput = this.handleKeyboardInput.bind(this);
  }

  handleKeyboardInput(character) {

    // this is because enter gets included for some reason
    if(character.length > 1){return}

    this.setState((state) => {

      // this adds in the new character
      state.characters.splice(state.cursorAfter+1, 0, { value: character, cursorAfter: true } );

      // this removes the cursor from the last character
      state.characters[state.cursorAfter].cursorAfter = false;

      state.cursorAfter += 1;
      
      return state;
    })
  }

  handleSpaceBar() {
    this.stateState((state)=>{
      state.characters.splice( cursorAfter+1, 0, ' ' );
      state.cursorAfter += 1;
      addWord();
      return state;
    });
  }

  handleDelete() {
    this.setState((state) => {
      state.characters.splice( state.cursorAfter, 1 );
      state.characters[state.cursorAfter - 1].cursorAfter = true;
      state.cursorAfter -= 1;
      return state;
    })

  } 


  handleArrows(direction) {
    if(direction === 'Right') {
      this.setState((state) => {
        if(this.state.cursorAfter === this.state.characters.length - 1){return}
        state.characters[state.cursorAfter].cursorAfter = false;
        state.characters[state.cursorAfter + 1].cursorAfter = true;
        state.cursorAfter += 1;
        return state;
      })
    }    
    
    if(direction === 'Left') {
      this.setState((state) => {
        if(this.state.cursorAfter === 0){return}
        state.characters[state.cursorAfter].cursorAfter = false;
        state.characters[state.cursorAfter - 1].cursorAfter = true;
        state.cursorAfter -= 1;
        return state;
      })
    }
  } 
  

  handleClick(index) {
    this.setState((state) => { 
      state.characters[state.cursorAfter - 1].cursorAfter = false;
      state.cursorAfter = index;
      state.characters[index].cursorAfter = true;
      return state;
    })
  }

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
        onKeyDown={(e)=>{
          if(e.key === "Backspace"){         
            this.handleDelete()
          }
          if(e.key.slice(0,5) === "Arrow"){         
            this.handleArrows(e.key.slice(5))
          }

        }}
      >

        {this.state.characters.map((charObj, i) => (
          <ThesaurusLetter
            key={charObj.value + i}
            index={i}
            charObj={charObj}
            onClick={this.handleClick.bind(this)}
          />
        ))}




      </div>
    );
  }
}

export default ThesaurusInput;


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
