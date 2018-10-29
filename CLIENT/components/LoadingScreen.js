import _ from "underscore";
import React from "react";
import styled, { css } from 'react-emotion';

const imageWrapper = css`
    position: absolute;
    left: 50%;
    top: 46%; 
    transform: translate(-50%, -50%);
`

const whiteText = css`
    color: white;
`
const LoadingScreen = () => (
    <div className={imageWrapper}>
        <div><h1 className={whiteText}>Fetching Synonyms... </h1></div>
        <img src={"https://loading.io/spinners/typing/lg.-text-entering-comment-loader.gif"}></img>
    </div>
)

export default LoadingScreen;