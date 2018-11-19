import { css } from "react-emotion";

const dropDownCSS = css`
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

const synonymCSS = css`
  padding: 2px;
  &:hover {
    background-color: lightgray;
    border-radius: 5px;
    cursor: pointer;
  }
`;

module.exports = {
  dropDownCSS,
  synonymCSS,
}