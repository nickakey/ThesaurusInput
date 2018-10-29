import React from "react";
import styled, { css } from 'react-emotion';

const dropDownContent = css`
    display: none;
    position: absolute;
    background-color: inherit;
    width: inherit;
    transform: translate(-50%, 0); 
    box-shadow: 0.2rem 0.4rem 0.4rem rgb(0,0,0,.3);
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