import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'react-emotion';

const imageWrapper = css`
    position: absolute;
    left: 50%;
    top: 46%; 
    transform: translate(-50%, -50%);
`;

const whiteText = css`
    color: white;
`;

const LoadingScreen = () => (
  <div className={imageWrapper}>
    <div><h1 className={whiteText}>Fetching Synonyms... </h1></div>
    <img alt="loadingIcon" src="https://loading.io/spinners/typing/lg.-text-entering-comment-loader.gif"/>
  </div>
);

export default LoadingScreen;
