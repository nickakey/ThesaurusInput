import React from 'react';
import { css, keyframes } from 'react-emotion';
import axios from 'axios-jsonp-pro';
import ThesaurusLetter from './ThesaurusLetter';

function logState() {
  console.log('this is the state ', this.state)
}

const dropDown = css`
  display: none;
  position: absolute;
  z-index: 5;
  background-color: white;
  top: 55%;
  transform: translate(-65%, 40%);
  padding: 10px;
  border: 1px solid black;
  border-radius: 10px;
`

const dropDownWrapper = css`
background-color: black;
`

const wordCSS = css`
  display: inline-block;
  background-color: white;
  &:hover {
      .${dropDown} {
          display: inline-block;
      }
  }  
`


const synonymCSS = css`
  padding: 2px;
  &:hover {
    background-color: lightgray;
    border-radius: 5px;
    cursor: pointer;
  }
`

const input = css`
  position: absolute;
  background-color: white;
  display: block;
  top: 40%;
  left: 50%; 
  transform: translate(-50%, -50%);
  padding: 20px;
  width: 51%;
  text-align: left;
  border-radius: 5px;
  z-index: -5;
`;

class ThesaurusInput extends React.Component {



  static synonymsFormatter(synonyms) {
    console.log('is this being called');
    
    const formattedSynonyms = [];
    if (!synonyms) { return formattedSynonyms.push([undefined]); }
    synonyms.response.forEach(({ list: { synonyms: synonymsString }}) => {
      synonymsString.split('|')
        .forEach((synonym) => {
          formattedSynonyms.push(synonym.split(' ')[0]);
        });
    })
    return formattedSynonyms;
  }

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

  getSynonyms(word, wordIndex) {    
    axios.jsonp(`http://thesaurus.altervista.org/thesaurus/v1?word=${word}&language=en_US&output=json&key=yj7S3AHHSC5OTOF3rJhK`,
      { timeout: 3500 })
      .then((result) => {
        this.setState((state)=>{
          state.synonyms[wordIndex] = ThesaurusInput.synonymsFormatter(result);
        });
      })
      .catch((err)=>{
        reject(err);
      })    
  }


  handleSpaceBar() {
    const { words, cursorAfter: { wordIndex, characterIndex } } = this.state;
    const isAtMaxLeft = this.state.maxLeft;

    if (isAtMaxLeft) {
      this.setState((state)=>{
        state.word.unshift([{ value: ' ' }])
        ThesaurusInput.handleCursorMove(state, 'Right');
        state.maxLeft = false;
        return state;
      });
    }      

    const prevCharacter = words[wordIndex][characterIndex];
    const nextCharacter = words[wordIndex][characterIndex + 1];

    const prevCharacterIsSpace = prevCharacter.value === ' ';
    const firstCharacterInNextWordIsSpace = !nextCharacter && words[wordIndex + 1] && words[wordIndex + 1][0].value === ' ';
    const addingSpaceToMiddleOfWord = nextCharacter;

    if (prevCharacterIsSpace) {
      this.setState((state)=>{
        state.words[wordIndex].push({ value: ' ' });
        ThesaurusInput.handleCursorMove(state, 'Right');
        return state;
      });
    }

    if (firstCharacterInNextWordIsSpace) {
      this.setState((state)=>{
        state.words[wordIndex + 1].unshift({ value: ' ' });
        ThesaurusInput.handleCursorMove(state, 'Right');
        return state;
      });
      

    }
    if (addingSpaceToMiddleOfWord) {
      this.setState((state)=>{
        const newWord = state.words[wordIndex].splice(characterIndex + 1)
        state.words.splice(wordIndex + 1, 0, [{ value: ' ' }], newWord);
        ThesaurusInput.handleCursorMove(state, 'Right');
        return state;
      });
    }

    this.setState((state)=>{
      state.words.splice(wordIndex + 1, 0, [{ value: ' ' }]);
      ThesaurusInput.handleCursorMove(state, 'Right');
      return state;
    });
    this.getSynonyms(words[wordIndex].reduce((acc, el) => (acc.concat(el.value)), ''), wordIndex);
    


  }



  handleKeyboardInput(character) {
    this.props.keyboardCallback();
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
        id="input"
        data-testid="input"
        className={input}
        autoFocus="true"
        tabIndex="0"
        onKeyDown={(e) => {
          if (e.key === 'Backspace') {
            this.handleDelete()
          } else if (e.key.slice(0,5) === 'Arrow') {
            this.handleArrows(e.key.slice(5));
          } else {
            this.handleKeyboardInput(e.key);
          }
        }}
      >

        {this.state.words.map((word, j) => {
          return ( 
            <span>  
              <span className={wordCSS}>  
                {word.map((charObj, i) => {
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
                })}
                <span className={dropDownWrapper}>
                  <span className={dropDown}>
                    { this.state.synonyms[j] ? 
                      this.state.synonyms[j].map(synonym => (
                        <div className={synonymCSS}>
                          {synonym}
                        </div>
                      )) : <span></span>
                    }
                  </span>
                </span>
              </span>
            </span>)
        })}

      </div>
    );
  }
}

export default ThesaurusInput;