import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';
import Button from '../reusableComponents/Button.jsx';
import DropDown from '../reusableComponents/DropDown.jsx';


const textAlignCenter = css`
    text-align: center;
`;

const topRightButton = css`
    display: inline-block;
    position: absolute;
    left: 81%;
    top: 13%;
    width: 300px;    
`;

const centeredContainer = css`
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
`;


const SentenceRoller = ({ handleSynonymClick, keyWords, handleNewSentence, synonyms }) => (
  <div>
    <div className={centeredContainer}>
      <div className={textAlignCenter}>
        {keyWords.map((keyword, index) => (
          <DropDown
            key={index}
            onClick={handleSynonymClick}
            topItem={keyword}
            topItemIndex={index}
            dropDownItems={synonyms[index]}
          />
        ))}
      </div>
    </div>
    <div className={css`${textAlignCenter} ${topRightButton}`}>
      <Button handleOnClick={handleNewSentence} text="New Sentence"/>
    </div>
  </div>
)

export default SentenceRoller;

SentenceRoller.propTypes = {
  synonyms: PropTypes.arrayOf(PropTypes.string).isRequired,
  keyWords: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleSynonymClick: PropTypes.func.isRequired,
  handleNewSentence: PropTypes.func.isRequired,
};
