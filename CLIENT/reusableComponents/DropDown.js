import React from "react";
import styled, { css } from 'react-emotion';

const dropDownContent = css`
    display: none;
    position: absolute;
    background-color: inherit;
    width: inherit;
    transform: translate(-50%, 0); 
    box-shadow: 0.2rem 0.4rem 0.4rem rgb(0,0,0,.3);
    overflow: scroll;
    max-height: 30vh;    
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

const noneFoundDropDownContainer = css`
    background-color: lightgrey;
    cursor: not-allowed;
`

const DropDown = ({topItem, topItemIndex, dropDownItems, onClick}) => {
    
    if(!dropDownItems[0]){
        return (
            <div className={`${dropDownContainer} ${noneFoundDropDownContainer}`}>
                <div>
                    {topItem}
                </div>
                <div className={dropDownContent}>
                    {dropDownItems.map((item, index)=>{
                        return <div key={index}>{"No Synonyms Found"}</div>         
                    })}
                </div>
            </div>
        )
    } else {
        return (
            <div className={dropDownContainer}>
                <div>
                    {topItem}
                </div>
                <div className={dropDownContent}>
                    {dropDownItems.map((item, index)=>{
                        return <div key={index} onClick={()=>{onClick(item, topItemIndex)}}>{item}</div>         
                    })}
                </div>
            </div>
        )
    }


}

export default DropDown;