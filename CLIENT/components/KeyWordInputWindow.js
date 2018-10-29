import _ from "underscore";
import React from "react";
import styled, { css } from 'react-emotion';
import Button from "../reusableComponents/Button.js";
import Input from "../reusableComponents/Input.js";


const inlineBlock = css`
    display: inline-block;
`
const textAlignCenter = css`
    text-align: center;
`

const centeredContainer = css`
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
`


const KeyWordInputWindow = ({numberOfWordSlots, handleChange, handleSubmit, addNewWordSlot}) => (
    <div className={centeredContainer}>
        <div className={textAlignCenter}>
            <div className={inlineBlock}>
                {_.range(numberOfWordSlots).map((num, index)=>{
                    return <Input key={index} index={index} onChange={(e)=>{handleChange(num, e.target.value)}}></Input>
                })}
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

export default KeyWordInputWindow;