import React from "react";
import styled, { css } from 'react-emotion';

const dropDownContent = css`
    display: none;
    position: absolute;
    background-color: inherit;
    /* left: 50%; */
    width: inherit;
    transform: translate(-50%, 0);    
`

const dropDownContainer = css` 
    display: inline-block;
    width: 140px;
    background-color: white;
    &:hover {
        .${dropDownContent} {
            display: inline-block;
        }
    }
    
`



const DropDown = ({topItem, dropDownItems}) => (
    <div className={dropDownContainer}>
        <div>
            {topItem}
        </div>
        <div className={dropDownContent}>
            {dropDownItems.map((item)=>{
                return <div>{item}</div>         
            })}
        </div>
    </div>
)

export default DropDown;