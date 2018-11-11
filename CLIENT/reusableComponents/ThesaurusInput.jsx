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
  top: 100%;
  left: 0;
  padding: 10px;
  border: 1px solid black;
  border-radius: 10px;
`

const spaceCSS = css`
  padding: 10px 0px 10px 0px; 
  height: 42px;
  display: inline-block;
`

const dropDownWrapper = css`
background-color: black;
`

const wordCSS = css`
  padding: 10px 0px 10px 0px; 
  display: inline-block;
  position: relative;
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
  height: 4rem;
  position: absolute;
  background-color: white;
  display: block;
  top: 40%;
  left: 50%; 
  transform: translate(-50%, -50%);
  width: 51%;
  text-align: left;
  border-radius: 5px;
  z-index: -5;
  padding-left: 10px;
`;

class ThesaurusInput extends React.Component {

  static splitStringIntoLettersArray(string) {
    return string.split('').reduce((acc, el, i) => {
      acc.push({ value: el });
      return acc;
    }, [])
  }

  static synonymsFormatter(synonyms) {
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
      words: [
        [{ value: 'h' }, { value: 'e' }, { value: 'y' }],
        [{ value: ' ' }],
        [{ value: 'f' }, { value: 'r' }, { value: 'i' }, { value: 'e' }, { value: 'n' }, { value: 'd' }],
      ],
      synonyms: [['hulloo', 'hi', 'howdy'], [], ['pal', 'buddy', 'companion']],
      cursorAfter: { wordIndex: 2, characterIndex: 5 }, 
      maxLeft: false,
    };
    this.handleKeyboardInput = this.handleKeyboardInput.bind(this);
  }

  getSynonyms(word, wordIndex) {    
    // axios.jsonp(`http://thesaurus.altervista.org/thesaurus/v1?word=${word}&language=en_US&output=json&key=yj7S3AHHSC5OTOF3rJhK`,
    //   { timeout: 3500 })
    //   .then((result) => {
    //     this.setState((state)=>{
    //       state.synonyms[wordIndex] = ThesaurusInput.synonymsFormatter(result);
    //     });
    //   })
    //   .catch((err)=>{
    //     reject(err);
    //   })    
  }

  handleSynonymClick(synonym, wordIndex) {
    this.setState((state)=>{
      state.words[wordIndex] = ThesaurusInput.splitStringIntoLettersArray(synonym);
      if (state.cursorAfter.wordIndex === wordIndex) {
        state.cursorAfter.characterIndex = synonym.length - 1;
      }
      return state;
    });
  }

  handleSpaceBar() {
    const { words, cursorAfter: { wordIndex, characterIndex } } = this.state;
    const isAtMaxLeft = this.state.maxLeft;

    if (isAtMaxLeft) {
      return this.setState((state)=>{
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
      return this.setState((state)=>{
        state.words[wordIndex].push({ value: ' ' });
        ThesaurusInput.handleCursorMove(state, 'Right');
        return state;
      });
    }

    if (firstCharacterInNextWordIsSpace) {
      return this.setState((state)=>{
        state.words[wordIndex + 1].unshift({ value: ' ' });
        ThesaurusInput.handleCursorMove(state, 'Right');
        return state;
      });
      

    }
    if (addingSpaceToMiddleOfWord) {
      return this.setState((state)=>{
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

    const isAtMaxLeft = this.state.maxLeft;

    if (isAtMaxLeft) {
      return this.setState((state)=>{
        state.words.splice(0, 0, [{ value: character }]);
        state.maxLeft = false;
        ThesaurusInput.handleCursorMove(state, 'Right');
        return state;
      });
    }  

    const { words, cursorAfter: { wordIndex, characterIndex } } = this.state;
    const prevCharacter = words[wordIndex][characterIndex];
    
    const spaceBeforeAndNoWordAfter = prevCharacter.value === ' ' && (!words[wordIndex + 1]);
    const spaceBeforeAndWordAfter = prevCharacter.value === ' ' && (words[wordIndex + 1] && words[wordIndex + 1][0]);

    if (spaceBeforeAndNoWordAfter) {
      return this.setState((state)=>{
        state.words.splice(wordIndex + 1, 0, [{ value: character }])
        ThesaurusInput.handleCursorMove(state, 'Right');
        return state;
      });
    } 

    if (spaceBeforeAndWordAfter) {
      return this.setState((state)=>{
        state.words[wordIndex + 1].splice(0, 0, { value: character })
        ThesaurusInput.handleCursorMove(state, 'Right');
        return state;
      });
    }

    // else add to current word
    this.setState((state)=>{              
      state.words[wordIndex].splice(characterIndex + 1, 0, { value: character })
      ThesaurusInput.handleCursorMove(state, 'Right');
      return state;
    });
  }


  handleDelete() {
    // TODO - I also have to handle the cursor

    if (this.state.maxLeft){ return }

    const { words, cursorAfter: { wordIndex, characterIndex } } = this.state;
    const characterToDelete = words[wordIndex][characterIndex];
    const currentWord = words[wordIndex];
    const prevWord = words[wordIndex - 1];
    const nextWord = words[wordIndex + 1];

    const deletingSingleSpaceBetweenTwoWords = characterToDelete.value === ' ' && currentWord.length === 1 && prevWord && nextWord;
    const deletingLastLetterInWord = currentWord.length === 1;

    if (deletingSingleSpaceBetweenTwoWords) {
      return this.setState((state)=>{
        ThesaurusInput.handleCursorMove(state, 'Left')
        const combinedWords = [...prevWord, ...nextWord];
        state.words.splice(wordIndex - 1, 3, combinedWords);
        return state;
      });
    } 

    if (deletingLastLetterInWord) {
      return this.setState((state)=>{
        ThesaurusInput.handleCursorMove(state, 'Left')
        state.words.splice(wordIndex, 1);
        return state;
      });
    }

    // if character has another character before it in the word, only delete that one character
    this.setState((state)=>{
      ThesaurusInput.handleCursorMove(state, 'Left')
      state.words[wordIndex].splice(characterIndex, 1);
      return state;
    });
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
          return word[0].value !== " " ? ( 
              <span className={wordCSS}>  
                {word.map((charObj, i) => {
                  return (
                    <ThesaurusLetter
                      onClick={this.handleSynonymClick}
                      maxLeft={this.state.maxLeft}
                      cursorIndex={this.state.cursorAfter}
                      wordIndex={j}
                      key={charObj.value + i}
                      index={i}
                      charObj={charObj}
                    />
                  )
                })}
                <span className={dropDown}>
                  { this.state.synonyms[j] ? 
                    this.state.synonyms[j].map(synonym => (
                      <div 
                        onClick={()=>{this.handleSynonymClick(synonym, j)}}
                        className={synonymCSS}>
                        {synonym}
                      </div>
                    )) : <span></span>
                  }
                </span>
              </span> ) : (
              <span className={spaceCSS}>  
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
              </span>
              )
        })}

      </div>
    );
  }
}

export default ThesaurusInput;