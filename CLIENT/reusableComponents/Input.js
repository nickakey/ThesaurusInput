import React from "react";
import styled, { css } from 'react-emotion';



const StyledInput = styled('input')`
    margin: 3px;
    background-color: white;
    display: inline-block;
    padding: 10px;
    border: solid #646161;
    border-width: 2px;
    font-weight: bold;
    border-radius: 5px;
    text-transform: uppercase;
    font-size: 10px;
    transition: all .2s;
    cursor: text;
    /* &:hover {
        transform: translate(0, -1px);
        box-shadow: 0 .3rem .2rem rgb(0, 0, 0, .2);
    }    */
    /* &:active {
        transform: translate(0, 1px);
        box-shadow: 0 .4rem .4rem rgb(0, 0, 0, .2);
        outline-style: outset;
        outline-color: rgba(123, 121, 121, 0.55);
        outline-width: 2px;
        transition: all .2s;
    }  */
    &:focus {
        /* box-shadow: 0 .1rem .1rem rgb(0, 0, 0, .2); */
        outline: none;
        box-shadow: 0 0 5pt 3pt rgb(0, 0, 0, .3);
        transition: all .3s;
    }
`

const Input = ({onChange, key}) => (
    <StyledInput key={key} onChange={onChange}>
    </StyledInput>
)

export default Input;