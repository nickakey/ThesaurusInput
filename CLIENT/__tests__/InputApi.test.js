/* eslint-disable */
import { render, fireEvent, cleanup, getNodeText } from "react-testing-library";
import React from "react";
import axios from "axios-jsonp-pro";
import ThesaurusInput from "../reusableComponents/ThesaurusInput.jsx";
import randomLetter from "random-letter";
jest.mock("axios-jsonp-pro");

const mockThesaurusResponseData = {
  response: [{
    list: {
      synonyms: "1|2|3|4"
    }
  }]
}

let onChange;
let input;

function generateURL(word){return `http://thesaurus.altervista.org/thesaurus/v1?word=${word}&language=en_US&output=json&key=yj7S3AHHSC5OTOF3rJhK`}
function numOfWords() { return input.children.length; }
function numOfCharacters(wordIndex = 0) { return input.children[wordIndex].children.length; }

function getCharacter(wordIndex, letterIndex) {
  return input.children[wordIndex].children[letterIndex];
}

function hasSynonymList(){
  return input.children[0].children[1] !== undefined;
}

function hasCursor(wordIndex, letterIndex) {
  return input.children[wordIndex].children[letterIndex].classList.length === 2;
}

function click(domNode){
  fireEvent.click(domNode);
}

function typeCharacter(character = randomLetter()) {
  fireEvent.keyDown(input, { key: character });
}

function typeSpace() { typeCharacter(" "); }

function arrowLeft() { typeCharacter("ArrowLeft"); }

function arrowRight() { typeCharacter("ArrowRight"); }

function typeBackspace() { typeCharacter("Backspace"); }

beforeEach(() => {
  onChange = jest.fn();
  const { getByTestId } = render(
    <ThesaurusInput onChange={onChange} />,
  );
  input = getByTestId("input");  
  axios.jsonp.mockImplementation(() => {
    return Promise.resolve(mockThesaurusResponseData)
  })
  axios.jsonp.mockClear(0);
  
})

afterEach(cleanup)

//HighLightColor
//duh



//ON CHANGE

test("when characters are typed, onchange is called", () => {
  const someLetter = randomLetter();
  typeCharacter(someLetter);
  expect(onChange).toBeCalledTimes(1);
  expect(onChange).toHaveBeenLastCalledWith(someLetter);
    
  const someLetter2 = randomLetter();
  typeCharacter(someLetter2);
  expect(onChange).toBeCalledTimes(2);
  expect(onChange).toHaveBeenLastCalledWith(someLetter2);

})

test("when a character is deleted, onchange is called", () =>{
  typeCharacter();
  typeBackspace();
  expect(onChange).toBeCalledTimes(2);
  expect(onChange).toHaveBeenLastCalledWith("");
})

test("when space is typed, onchange is called", () => {
  typeSpace();
  expect(onChange).toBeCalledTimes(1);
  expect(onChange).toHaveBeenLastCalledWith(" ");
})

test("when a synonym is chosen, onchange is called", () => {
  jest.useFakeTimers();
  const someLetter = randomLetter();
  typeCharacter(someLetter);
  expect(onChange).toBeCalledTimes(1);
  jest.runAllTimers();
  jest.useRealTimers();  
  setTimeout(() => {
    const firstElementOfDropdown = input.children[0].children[1].children[0];
    click(firstElementOfDropdown);
    setTimeout(() => {
      expect(onChange).toBeCalledTimes(2);
      expect(onChange).toHaveBeenLastCalledWith("1");
    }, 500);
  }, 50);
})



//className
//when invoked with custom class name
//outer most div contains that className

//ID
//when invoked with id prop
//the id of the outermost container matches the arg id

//PLACEHOLDER
//When invoked with placeholder text
//there is an element in the html with that placeholder text 
//the placeholder texts dissapears as soon as any letter is written
//and reappears when no letters are written

//AUTOFOCUS
//when invoked with autofocus true
//the autofocus of the element with click handling is set to true

//THESAURUS (bool)
//when "off" 
//no thesaurus requests get made

//DISABLE
//if true, the input will be disabled

/*
  CLASSES object
  with the following keys
    -character
    -blink
    -cursorAfterElement
    -cursorBeforeElement
    -SpaceCSS
    -wordCSS
    -greenWordCSS
    -SynonymCSS
    -input
*/
