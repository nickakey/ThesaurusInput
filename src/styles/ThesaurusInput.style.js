import { css, keyframes } from "react-emotion";

const placeHolderText = css`
  margin: 5px 0px 5px 0px;
  padding: 5px 3px 5px 3px;
  border-radius: 10px;
  display: inline-block;
  position: relative;
  background-color: white;
  font-size: 35px;
  color: black;
  opacity: .4;
`

const dropDown = css`
  display: none;
  position: absolute;
  z-index: 5;
  background-color: white;
  top: 100%;
  left: 0;
  padding: 10px;
  border: 1px solid black;
  border-radius: 10px;
  transition: opacity .5s;
  &:focus {
    outline :0;
  }   
`

const spaceCSS = css`
  margin: 5px 0px 5px 0px;
  padding: 5px 0px 5px 0px;
  height: 42px;
  display: inline-block;
`

const wordCSS = css`
  margin: 5px 0px 5px 0px;
  padding: 5px 3px 5px 3px;
  border-radius: 10px;
  display: inline-block;
  position: relative;
  background-color: white;
  transition: background-color .2s;
  &:hover {
      .${dropDown} {
        display: inline-block;
      }
  }  
`;

const greenWordCSS = css`
  background-color: #7bd68f6e;
  transition: all .4s;
`;


const synonymCSS = css`
  padding: 2px;
  &:hover {
    background-color: lightgray;
    border-radius: 5px;
    cursor: pointer;
  }
`;

const input = css`
  height: 4rem;
  position: absolute;
  background-color: white;
  display: block;
  top: 40%;
  left: 50%; 
  transform: translate(-50%, -50%);
  width: 51%;
  text-align: left;
  border-radius: 5px;
  z-index: -5;
  padding-left: 10px;
  &:focus {
    outline :0;
  }  
`;

const blink = keyframes`
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
`;


const cursorBeforeElement = css`
  &::before {
    content: "";
    animation: ${blink} 1s linear infinite;
    padding: 0px;
    width: 1px;
    border: solid black 1px;
    position: absolute;
    height: 43px;
    box-sizing: border-box;
  };
`;

module.exports = {
  placeHolderText,
  dropDown,
  spaceCSS,
  wordCSS,
  greenWordCSS,
  synonymCSS,
  input,
  blink,
  cursorBeforeElement,
}