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
  cursorBeforeElement,
}