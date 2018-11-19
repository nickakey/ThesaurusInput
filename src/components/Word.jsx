import React from 'react';
import ThesaurusLetter from "./ThesaurusLetter";
import Dropdown from './Dropdown';
import { spaceCSS, wordCSS, greenWordCSS } from "../styles/ThesaurusInput.style.js";

const Word = ({ word, determineClassName, handleLetterClick, maxLeft, cursorAfter, wordIndex, synonyms, handleSynonymClick }) => {
  return word[0].value !== " " ? ( 
    <span 
      key={word[0].value + wordIndex}
      className={determineClassName(wordIndex, wordCSS, `${wordCSS} ${greenWordCSS}`)}
    >  
      {word.map((charObj, i) => {
        return (
          <ThesaurusLetter
            onClick={(...args) => {handleLetterClick(...args)}}
            maxLeft={maxLeft}
            cursorIndex={cursorAfter}
            wordIndex={wordIndex}
            key={charObj.value + i}
            index={i}
            charObj={charObj}
          />
        );
      })}
      
      <Dropdown synonyms={synonyms} handleSynonymClick={handleSynonymClick} wordIndex={wordIndex}/>

    </span> ) : (
      <span 
        key={word[0].value + wordIndex}
        className={spaceCSS}>  
        {word.map((charObj, i) => {
          return (
            <ThesaurusLetter
              onClick={(...args) => {handleLetterClick(...args)}}
              maxLeft={maxLeft}
              cursorIndex={cursorAfter}
              wordIndex={wordIndex}
              key={charObj.value + i}
              index={i}
              charObj={charObj}
            />
          );
        })}
      </span>
    )
}

export default Word;