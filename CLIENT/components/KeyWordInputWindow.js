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
    /* basically anytime you want center, use position absolute, because html hates vertical stuff  */
    position: absolute;
    /* These top and left mean 50% FROM the parent element */
    top: 40%;
    left: 50%;

    /* without these, the far left side of this element would be at the 50% mark of the parent elemnet.
    WITh this translate, we shift the element 50% to the left, such that now it's actually centered */
    transform: translate(-50%, -50%);
`


const KeyWordInputWindow = ({numberOfWordSlots, handleChange, handleSubmit, addNewWordSlot}) => (
    <div className={centeredContainer}>
        <div className={textAlignCenter}>
            <div className={inlineBlock}>
                {_.range(numberOfWordSlots).map((num)=>{
                    return <Input key={num} onChange={(e)=>{handleChange(num, e.target.value)}}></Input>
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