import React from 'react';
import { css, keyframes } from 'react-emotion';
import PropTypes from 'prop-types';

const character = css`
  background-color: white;
  font-size: 35px;
  color: black;
`;

const blink = keyframes`
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
`;

const cursorAfterElement = css`
  &::after {
    content: "";
    animation: ${blink} 1s linear infinite;
    padding: 0px;
    width: 1px;
    border: solid black 1px;
    position: absolute;
    height: 43px;
    box-sizing: border-box;
  };
`

const cursorBeforeElement = css`
  &::before {
    content: "";
    animation: ${blink} 1s linear infinite;
    padding: 0px;
    width: 1px;
    border: solid black 1px;
    position: absolute;
    height: 43px;
    box-sizing: border-box;
  };
`


function determineClass(charIndex, wordIndex, cursorIndex, maxLeft) {
  if (wordIndex === cursorIndex.wordIndex && 
    charIndex === cursorIndex.characterIndex && 
    maxLeft) {
    return `${character} ${cursorBeforeElement}`

  }
  if (wordIndex === cursorIndex.wordIndex && 
    charIndex === cursorIndex.characterIndex) {
    return `${character} ${cursorAfterElement}`;
  }
  return character;
}


const ThesaurusLetter = ({ index, charObj, wordIndex, cursorIndex, maxLeft}) => {
  // If the very first character is space
  if (charObj.value === " ") {
    return (
      <span
        className={determineClass(index, wordIndex, cursorIndex, maxLeft)}
        onClick={() => { onClick(index)}}
      >
        &nbsp;
      </span>
    )
  }

  return (
    <span
      className={determineClass(index, wordIndex, cursorIndex, maxLeft)}
      onClick={() => { onClick(index)}}
    >
      {charObj.value}
    </span>
  )  

  // // If the very first character is space
  //   // AND if the cursor is on the very first character  
  // if (charObj.value === " " && shouldRenderCursorBefore) {
  //   return (
  //     <span
  //       className={`${character} ${cursorAfterElement}`}
  //       onClick={() => { onClick(index)}}
  //     >
  //       &nbsp;
  //     </span>
  //   )
  // }

  // //If the cursor is on the very first character
  // if (shouldRenderCursorBefore) {
  //   return (
  //     <span
  //       className={`${character} ${cursorBeforeElement}`}
  //       onClick={() => { onClick(index)}}
  //     >
  //       {charObj.value}
  //     </span>
  //   )
  // }
  
  // //if it's a normal character
  // return (
  //   <span
  //     className={charObj.cursorAfter ? `${character} ${cursorAfterElement}` : character}
  //     onClick={() => { onClick(index)}}
  //   >
  //     {charObj.value}
  //   </span>
  // )
}

ThesaurusLetter.propTypes = {
  index: PropTypes.number.isRequired,
  charObj: PropTypes.object.isRequired,
};


export default ThesaurusLetter;

