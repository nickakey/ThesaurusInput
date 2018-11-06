import React from 'react';
import { css, keyframes } from 'react-emotion';
import ThesaurusLetter from './ThesaurusLetter';

function logState() {
  console.log('this is the state ', this.state)
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
`;

class ThesaurusInput extends React.Component {
  static handleCursorMove(state, direction) {
    const directionIncrement = direction === 'Right' ? 1 : -1;
    const { words, cursorAfter, cursorAfter: { wordIndex, characterIndex } } = state;
    const currentCharacter = words[wordIndex][characterIndex];
    const adjacentLetter = words[wordIndex][characterIndex + directionIncrement];

    if (direction === 'Left' && wordIndex === 0 && characterIndex === 0) {
      state.leftCap = true;
    } else if (direction === 'Right' && state.leftCap) {
      state.leftCap = false;
    } else if (!adjacentLetter) {
      // case 1, there is no adjacent letter, to jump to closet letter in adjacent word
      state.leftCap = false;
      const indexOfLetterInAdjacentWord = direction === 'Right' ? 0 : words[wordIndex - 1].length - 1;
      cursorAfter.wordIndex += directionIncrement;
      cursorAfter.characterIndex = indexOfLetterInAdjacentWord;
    } else { 
      // case 2, else cursor should jump to adjacent letter
      state.leftCap = false;
      cursorAfter.characterIndex += directionIncrement;
    } 
  }

  constructor() {
    super();
    this.state = {
      words: [
        [
          { value: 't' },
          { value: 'y' },
          { value: 'p' },
          { value: 'e' },
        ],
        [
          { value: ' ' },
        ],
        [
          { value: 'H' },
          { value: 'e' },
          { value: 'r' },
          { value: 'e' },
        ],
      ],
      cursorAfter: { wordIndex: 0, characterIndex: 0 }, 
      leftCap: false,
    };
    this.handleKeyboardInput = this.handleKeyboardInput.bind(this);
  }

  handleSpaceBar() {
    // TODO - the current issue is that ...
      //the leftcap space does not add to adjacent spaces
    this.setState((state) => {
      const { words, cursorAfter: { wordIndex, characterIndex } } = state;
      const prevCharacter = words[wordIndex][characterIndex];
      const nextCharacter = words[wordIndex][characterIndex + 1];


      if (state.leftCap && prevCharacter.value === " ") {
        words[wordIndex].unshift({ value: ' '})
        ThesaurusInput.handleCursorMove(state, 'Right');
        state.leftCap = false;
        return state;
      }
      
      if (state.leftCap) {
        words.unshift([{ value: ' '}])
        ThesaurusInput.handleCursorMove(state, 'Right');
        state.leftCap = false;
        return state;
      }

      // if the prev character is space, then just add to current word
      if (prevCharacter.value === ' ') {
        words[wordIndex].push({ value: ' '});
        ThesaurusInput.handleCursorMove(state, 'Right');
        return state;
      }
      if (!nextCharacter && words[wordIndex + 1] && words[wordIndex + 1][0].value === ' ') {
        console.log("we are in the right if")
        words[wordIndex + 1].unshift({ value: ' '});
        ThesaurusInput.handleCursorMove(state, 'Right');
        return state;
      }      
      if (nextCharacter) {
        // Else If there is a next character,
        // take all the next characters and add them as a  word, 
        const newWord = words[wordIndex].splice(characterIndex + 1)
        words.splice(wordIndex + 1, 0, [{ value: ' '}], newWord);
        ThesaurusInput.handleCursorMove(state, 'Right');
        return state;
      }
      // else just add a new word that's a space
      words.splice(wordIndex + 1, 0, [{ value: ' '}]);
      ThesaurusInput.handleCursorMove(state, 'Right');
      return state;
    });
  }

  handleKeyboardInput(character) {
    // TODO: Right now, characters are only being coupled by checking the LEFT SIDE
    //So the code needs to check if the right side matches, and then handle that accordingly
    if (character.length > 1) { return; }
    if (character === ' ' ) { return this.handleSpaceBar(); } 

    this.setState((state) => {    
      if (state.leftCap) {
        state.words.splice(0, 0, [{ value: character}])
        return  ThesaurusInput.handleCursorMove(state, 'Right');
      }
      const { words, cursorAfter, cursorAfter: { wordIndex, characterIndex } } = state;
      const prevCharacter = words[wordIndex][characterIndex];
      const nextCharacter = words[wordIndex][characterIndex + 1];

      if (prevCharacter.value === ' ' && !nextCharacter && (!words[wordIndex + 1] || !words[wordIndex+1][0])) {
        // if prev character is space,
          // and there is no next character in the word
            //And the next adjacent character is a space or doesn't exist
              //start a new word
        words.splice(wordIndex + 1, 0, [{ value: character}])
        ThesaurusInput.handleCursorMove(state, 'Right');
        return state;
      } 

      if(prevCharacter.value === ' ' && (words[wordIndex + 1] && words[wordIndex+1][0])){
        //if prev character is space
          //and next adjacent character exists and is a letter
            //add this character to the beginning of the next adjacent word
        words[wordIndex+1].splice(0, 0, { value: character})
        ThesaurusInput.handleCursorMove(state, 'Right');
        return state;

      }


      // else add to current word
      words[wordIndex].splice(characterIndex + 1, 0, { value: character})
      ThesaurusInput.handleCursorMove(state, 'Right');
      return state;
    }, logState)
  }


  handleDelete() {
    // TODO - I also have to handle the cursor
    this.setState((state) => {
      if (state.leftCap){ return }
      const { words, cursorAfter, cursorAfter: { wordIndex, characterIndex } } = state;
      const characterToDelete = words[wordIndex][characterIndex];
      const currentWord = words[wordIndex];
      const prevWord = words[wordIndex - 1];
      const nextWord = words[wordIndex + 1];

      if (characterToDelete.value === ' ' && currentWord.length === 1 && prevWord && nextWord) {
      // if character being deleted is the only space seperating 2 words,
        // combine them into one word
        ThesaurusInput.handleCursorMove(state, 'Left')
        const combinedWords = [...prevWord, ...nextWord];
        words.splice(wordIndex - 1, 3, combinedWords);
      } else if (currentWord.length === 1) {
        // if character is only character in word, delete word
        ThesaurusInput.handleCursorMove(state, 'Left')
        words.splice(wordIndex, 1);
      } else {     
        // if character has another character before it in the word, only delete that one character
        ThesaurusInput.handleCursorMove(state, 'Left')
        words[wordIndex].splice(characterIndex, 1);
      }
    })

  } 


  handleArrows(direction) {
    this.setState((state)=>{
      ThesaurusInput.handleCursorMove(state, direction);
      return state;
    }, logState)
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
          if(e.key === 'Backspace') {
            this.handleDelete()
          }
          if(e.key.slice(0,5) === 'Arrow') {
            this.handleArrows(e.key.slice(5));
          }
        }}
      >

        {this.state.words.map((word, j) => {
          return word.map((charObj, i) => {
            return (
              <ThesaurusLetter
                leftCap={this.state.leftCap}
                cursorIndex={this.state.cursorAfter}
                wordIndex={j}
                key={charObj.value + i}
                index={i}
                charObj={charObj}
                onClick={this.handleClick.bind(this)}
              />
            )
          })
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
  - Then, the word has a marker on it that's like 'hasSynonyms : Yes'
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
