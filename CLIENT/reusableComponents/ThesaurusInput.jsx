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
    const { words, maxLeft, cursorAfter, cursorAfter: { wordIndex, characterIndex } } = state;
    const adjacentLetter = words[wordIndex][characterIndex + directionIncrement];

    const pressingRightWhenAlreadyRight = !adjacentLetter && !words[wordIndex + 1] && direction === "Right";
    const pressingLeftWhenAlreadyLeft = direction === 'Left' && wordIndex === 0 && characterIndex === 0;
    const pressingRightWhenMaxLeft = direction === 'Right' && maxLeft;
    const noMoreLettersInWord = !adjacentLetter;

    if (pressingRightWhenAlreadyRight) {
      return;
    }
    if (pressingLeftWhenAlreadyLeft) {
      state.maxLeft = true;
      return;
    }
    if (pressingRightWhenMaxLeft) {
      state.maxLeft = false;
      return;
    }
    if (noMoreLettersInWord) {
      state.maxLeft = false;
      const indexOfLetterInAdjacentWord = direction === 'Right' ? 0 : words[wordIndex - 1].length - 1;
      cursorAfter.wordIndex += directionIncrement;
      cursorAfter.characterIndex = indexOfLetterInAdjacentWord;
      return;
    }
    state.maxLeft = false;
    cursorAfter.characterIndex += directionIncrement;
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
      maxLeft: false,
    };
    this.handleKeyboardInput = this.handleKeyboardInput.bind(this);
  }

  handleSpaceBar() {
    this.setState((state) => {
      const { words, cursorAfter: { wordIndex, characterIndex } } = state;
      const isAtMaxLeft = state.maxLeft;

      if (isAtMaxLeft) {
        words.unshift([{ value: ' ' }])
        ThesaurusInput.handleCursorMove(state, 'Right');
        state.maxLeft = false;
        return state;
      }      

      const prevCharacter = words[wordIndex][characterIndex];
      const nextCharacter = words[wordIndex][characterIndex + 1];

      const prevCharacterIsSpace = prevCharacter.value === ' ';
      const firstCharacterInNextWordIsSpace = !nextCharacter && words[wordIndex + 1] && words[wordIndex + 1][0].value === ' ';
      const addingSpaceToMiddleOfWord = nextCharacter;

      if (prevCharacterIsSpace) {
        words[wordIndex].push({ value: ' '});
        ThesaurusInput.handleCursorMove(state, 'Right');
        return state;
      }
      if (firstCharacterInNextWordIsSpace) {
        words[wordIndex + 1].unshift({ value: ' '});
        ThesaurusInput.handleCursorMove(state, 'Right');
        return state;
      }
      if (addingSpaceToMiddleOfWord) {
        const newWord = words[wordIndex].splice(characterIndex + 1)
        words.splice(wordIndex + 1, 0, [{ value: ' '}], newWord);
        ThesaurusInput.handleCursorMove(state, 'Right');
        return state;
      }
      
      // else add a new word that's a space
      words.splice(wordIndex + 1, 0, [{ value: ' '}]);
      ThesaurusInput.handleCursorMove(state, 'Right');
      return state;
    });
  }

  handleKeyboardInput(character) {
    const isNonCharacterInput = character.length > 1;
    const isSpaceBar = character === ' ';
    
    if (isNonCharacterInput) { return; }
    if (isSpaceBar) { return this.handleSpaceBar(); } 

    this.setState((state) => {

      const isAtMaxLeft = state.maxLeft;
      if (isAtMaxLeft) {
        state.words.splice(0, 0, [{ value: character }]);
        state.maxLeft = false;
        ThesaurusInput.handleCursorMove(state, 'Right');
        return state;
      }  

      const { words, cursorAfter: { wordIndex, characterIndex } } = state;
      const prevCharacter = words[wordIndex][characterIndex];
      
      const spaceBeforeAndNoWordAfter = prevCharacter.value === ' ' && (!words[wordIndex + 1]);
      const spaceBeforeAndWordAfter = prevCharacter.value === ' ' && (words[wordIndex + 1] && words[wordIndex + 1][0]);

      if (spaceBeforeAndNoWordAfter) {
        words.splice(wordIndex + 1, 0, [{ value: character }])
        ThesaurusInput.handleCursorMove(state, 'Right');
        return state;
      } 

      if (spaceBeforeAndWordAfter) {
        words[wordIndex + 1].splice(0, 0, { value: character })
        ThesaurusInput.handleCursorMove(state, 'Right');
        return state;
      }

      // else add to current word
      words[wordIndex].splice(characterIndex + 1, 0, { value: character })
      ThesaurusInput.handleCursorMove(state, 'Right');
      return state;
    })
  }


  handleDelete() {
    // TODO - I also have to handle the cursor
    this.setState((state) => {
      if (state.maxLeft){ return }

      const { words,  cursorAfter: { wordIndex, characterIndex } } = state;
      const characterToDelete = words[wordIndex][characterIndex];
      const currentWord = words[wordIndex];
      const prevWord = words[wordIndex - 1];
      const nextWord = words[wordIndex + 1];

      const deletingSingleSpaceBetweenTwoWords = characterToDelete.value === ' ' && currentWord.length === 1 && prevWord && nextWord;
      const deletingLastLetterInWord = currentWord.length === 1;

      if (deletingSingleSpaceBetweenTwoWords) {
        ThesaurusInput.handleCursorMove(state, 'Left')
        const combinedWords = [...prevWord, ...nextWord];
        words.splice(wordIndex - 1, 3, combinedWords);
        return state;
      } 

      if (deletingLastLetterInWord) {
        ThesaurusInput.handleCursorMove(state, 'Left')
        words.splice(wordIndex, 1);
        return state;
      }

      // if character has another character before it in the word, only delete that one character
      ThesaurusInput.handleCursorMove(state, 'Left')
      words[wordIndex].splice(characterIndex, 1);
      return state;
    })

  } 


  handleArrows(direction) {
    this.setState((state)=>{
      ThesaurusInput.handleCursorMove(state, direction);
      return state;
    })
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
                maxLeft={this.state.maxLeft}
                cursorIndex={this.state.cursorAfter}
                wordIndex={j}
                key={charObj.value + i}
                index={i}
                charObj={charObj}
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



/* 
TESTS: 

SPACES
pass - space on left side of existing space
pass - Space on right side of existing space
pass - space in middle of word
pass - space on leftstop
pass - space on right stop
pass - Space if there is nothing in the field

Letter on left stop
Letter on right stop
Letter in middle 

Cursor
🐛 - clear the input and try and space bar...
🐛 - clear the input then try and go right...
PASS - when I start a new word from scratch, the cursor ends up on the left side of the word

*/