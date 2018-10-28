import React from "react";
import styled, { css } from 'react-emotion';



const StyledButton = styled('span')`
    margin: 3px;
    background-color: #544444;
    display: inline-block;
    padding: 10px;
    border: solid black;
    border-width: 1px;
    font-weight: bold;
    border-radius: 40px;
    text-transform: uppercase;
    font-size: 15px;
    -webkit-transition: all .2s;
    transition: all .2s;
    cursor: pointer;
    color: white;
}
    &:hover {
        transform: translate(0, -1px);
        box-shadow: 0 .3rem .2rem rgb(0, 0, 0, .2);

        
    }   
    &:active {
        transform: translate(0, 1px);
        box-shadow: 0 .2rem .2rem rgb(0, 0, 0, .2);
} 
`

const Button = ({handleOnClick, text}) => (
    <StyledButton onClick={handleOnClick}>
        {text}
    </StyledButton>
)

export default Button;