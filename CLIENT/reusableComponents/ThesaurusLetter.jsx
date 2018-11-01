import React from 'react';
import { css, keyframes } from 'react-emotion';
import PropTypes from 'prop-types';

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

const cursorAfterElement = css`
  &::after {
    content: "|";
    animation: ${blink} 1s linear infinite;
  };
`
const ThesaurusLetter = ({ index, charObj, onClick }) => (

  <span
    className={charObj.cursorAfter ? `${character} ${cursorAfterElement}` : character}
    onClick={() => { onClick(index)}}
  >
    {charObj.value}
  </span>

)

ThesaurusLetter.propTypes = {
  index: PropTypes.number.isRequired,
  charObj: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};


export default ThesaurusLetter;

