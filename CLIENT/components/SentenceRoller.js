import _ from "underscore";
import React from 'react';
import axios from "axios-jsonp-pro";
import SynonymSelector from "./SynonymSelector";
import styled, { css } from 'react-emotion';
import Button from "../reusableComponents/Button.js";
import DropDown from "../reusableComponents/DropDown.js";

const inlineBlock = css`
    display: inline-block;
`
const textAlignCenter = css`
    text-align: center;
`

const topRightButton = css`
    display: inline-block;
    position: absolute;
    left: 81%;
    top: 13%;
    width: 300px;    
`

const centeredContainer = css`
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
`

const keyWords = css`
    display: inline-block;
    margin: 10px;
    margin-left: 20px;
    margin-right: 20px;
`

const SentenceRoller = ({handleSynonymClick, keyWords, handleNewSentence, synonyms}) => (
    <div>
        <div className={centeredContainer}>
        <div className={textAlignCenter}>
            {keyWords.map((keyword, index)=>(
                <DropDown 
                    key={index}
                    onClick={handleSynonymClick}
                    topItem={keyword} 
                    topItemIndex={index} 
                    dropDownItems={synonyms[index]}
                ></DropDown>
            ))}
        </div>
        </div>
        <div className={css`${textAlignCenter} ${topRightButton}`}>
            <Button handleOnClick={handleNewSentence} text={"New Sentence"}></Button>
        </div>
    </div>
)

export default SentenceRoller;


