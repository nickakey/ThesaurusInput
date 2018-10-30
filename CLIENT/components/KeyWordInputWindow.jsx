import PropTypes from 'prop-types';
import _ from 'underscore';
import React from 'react';
import { css } from 'react-emotion';
import Button from '../reusableComponents/Button';
import Input from '../reusableComponents/Input';


const textAlignCenter = css`
    text-align: center;
`;

const textInput = css`
    display: inline-block;
    width: 70vw;
`;

const centeredContainer = css`
    position: absolute;
    top: 70%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const KeyWordInputWindow = ({ handleChange, handleSubmit }) => (
  <div className={centeredContainer}>
    <div className={textAlignCenter}>
      <Input
        onChange={(e) => {
          handleChange(e.target.value)
        }} />
    </div>
    { /*<div className={textAlignCenter}>
       <Button handleOnClick={handleSubmit} text="SUBMIT SENTENCE"/>
      </div> */} 
  </div>
)

KeyWordInputWindow.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default KeyWordInputWindow;




