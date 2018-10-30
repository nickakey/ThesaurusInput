import PropTypes from 'prop-types';
import _ from 'underscore';
import React from 'react';
import { css } from 'react-emotion';
import Button from '../reusableComponents/Button';
import Input from '../reusableComponents/Input';

const inlineBlock = css`
    display: inline-block;
`;
const textAlignCenter = css`
    text-align: center;
`;
const centeredContainer = css`
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const KeyWordInputWindow = ({ numberOfWordSlots, handleChange, handleSubmit, addNewWordSlot }) => (
  <div className={centeredContainer}>
    <div className={textAlignCenter}>
      <div className={inlineBlock}>
        <Input onChange={(e) => {
          handleChange(e.target.value)
        }}/>
      </div>
    </div>

    <div className={textAlignCenter}>
      <div className={inlineBlock}>
        <Button handleOnClick={handleSubmit} text="SUBMIT"/>
        <Button handleOnClick={addNewWordSlot} text="ADD NEW WORD SLOT"/>
      </div>
    </div>
    
  </div>
)

KeyWordInputWindow.propTypes = {
  numberOfWordSlots: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  addNewWordSlot: PropTypes.func.isRequired,
};

export default KeyWordInputWindow;




