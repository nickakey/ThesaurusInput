import React from 'react';
import { injectGlobal } from 'emotion';
import ThesaurusInputConstructor from '../reusableComponents/ThesaurusInput';
import apikey from '../../config.js';

const ThesaurusInput = ThesaurusInputConstructor(apikey);

/* eslint-disable */
injectGlobal`
  * {
    @import url('https://fonts.googleapis.com/css?family=Work+Sans');
    font-family: 'Work Sans', sans-serif;
    box-sizing: border-box;    
    margin: 0px;
    padding: 0px;
    color: black;
  }

  body {
    background-color: black;
  }
`

const App = () => <ThesaurusInput onChange={(text)=>{console.log(text)}}/>

export default App;
