import {render, fireEvent, cleanup} from 'react-testing-library';
import React from 'react'
import ThesaurusInput from "../reusableComponents/ThesaurusInput.jsx";


afterEach(cleanup);

test('Keyboard input creates new children', ()=>{
  // Arrange
  const mockF = jest.fn();
  const {getByTestId} = render(
    <ThesaurusInput keyboardCallback={mockF}/>,
  )
  const input = getByTestId('input');
  
  // Act 
  fireEvent.keyDown(input, {key: 'h'});
  fireEvent.keyDown(input, {key: 'i'});

  // Assert
  expect(mockF).toBeCalled();
  expect(input.children.length).toBe(6);
  expect(input.children[4].innerHTML).toBe('h');
  expect(input.children[5].innerHTML).toBe('i');
})

test("Arrow Keys move the cursor", ()=>{
  //test that the cursor is in the right spot
  //Test that there is only one cursor
  //HANDLE EDGE CASES
})

test("Delete removes elements", ()=>{
  //make sure delete removes the count
  //make sure cursor is in the right spot 
  //HANDLE EDGE CASES
})

test("Space bar adds spaces", ()=>{
  //make sure space bar adds a space
  //make sure cursor is in the right spot 
  //HANDLE EDGE CASES
})



/*
EDGE CASES
At end of input
At beginning of input
Multiple spaces in a row
With a totally clear input
*/
