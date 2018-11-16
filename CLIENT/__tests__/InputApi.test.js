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
function numOfWords() {
  const words = input.children;
  let count = 0;
  for (let i = 0; i < words.length; i+=1) {
    if(words[i].id !== "placeHolder"){
      count +=1;
    }
  }
  return count;
}

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
  var { getByTestId } = render(
    <ThesaurusInput 
      className="someClassName" 
      onChange={onChange} 
      id="someID"
      placeHolder="some placeholder text"
      autofocus="false"
    />,
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
  expect(onChange).toHaveBeenLastCalledWith(someLetter + someLetter2);

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

test("When prop className included, className of outer div matches prop", () => {
  expect(input.className).toBe("someClassName");
})

test("When prop id included, id of outer div matches prop", () => {
  expect(input.id).toBe("someID");
})

test("When prop placeholder included, placeholder text matches prop", () => {
  const placeHolderText = getNodeText(input.children[0])
  expect(placeHolderText).toBe("some placeholder text");
})

//THESAURUS (bool)
//when "off" 
//no thesaurus requests get made

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
