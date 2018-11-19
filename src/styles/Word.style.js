import { css } from "react-emotion";
import { dropDownCSS } from "./Dropdown.style.js";

const spaceCSS = css`
  margin: 5px 0px 5px 0px;
  padding: 5px 0px 5px 0px;
  height: 42px;
  display: inline-block;
`;

const wordCSS = css`
  margin: 5px 0px 5px 0px;
  padding: 5px 3px 5px 3px;
  border-radius: 10px;
  display: inline-block;
  position: relative;
  background-color: white;
  transition: background-color .2s;
  &:hover {
      .${dropDownCSS} {
        display: inline-block;
      }
  }  
`;

const greenWordCSS = css`
  ${wordCSS}
  background-color: #7bd68f6e;
  transition: all .4s;
`;

module.exports = {
  greenWordCSS,
  spaceCSS,
  wordCSS,
}