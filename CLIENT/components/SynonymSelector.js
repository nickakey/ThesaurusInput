import _ from "underscore";
import React from "react";
import styled, { css } from 'react-emotion';

const modal = css`
    position: absolute;
    z-index: 1;
    background-color: #adadf7;
    width: 100%;
`


const SynonymSelector = ({synonyms, handleSynonymClick, handleCloseMenu}) => (
    <div className={modal}>
        {synonyms.map((synonym, index)=>{
            return <div onClick={()=>{handleSynonymClick(synonym)}}key={index}> {synonym} </div>
        })}
        <span onClick={()=>{handleCloseMenu()}}>close</span>
    </div>
)

export default SynonymSelector;