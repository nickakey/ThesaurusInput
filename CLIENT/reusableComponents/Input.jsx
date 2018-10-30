import React from 'react';
import styled from 'react-emotion';


const StyledInput = styled('input')`
    text-align: center;
    width: 75vw;
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
    &:focus {
        outline: none;
        box-shadow: 0 0 5pt 3pt rgb(0, 0, 0, .3);
        transition: all .3s;
    }
`;

const Input = ({onChange, index}) => (
    <StyledInput key={index} onChange={onChange}>
    </StyledInput>
)

export default Input;