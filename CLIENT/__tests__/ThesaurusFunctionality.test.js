/* eslint-disable */
import {render, fireEvent, cleanup} from "react-testing-library";
import React from "react";
import axios from "axios-jsonp-pro";
import ThesaurusInput from "../reusableComponents/ThesaurusInput.jsx";
import randomLetter from "random-letter";
jest.mock("axios-jsonp-pro");

const mockThesaurusResponseData = {
  response: [{
    list: {
      synonyms: "hullo|hi|howdy|how-do-you-do|greeting (generic term)|salutation (generic term)"
    }
  }]
}

let mockFunction;
let input;

function generateURL(word){return `http://thesaurus.altervista.org/thesaurus/v1?word=${word}&language=en_US&output=json&key=yj7S3AHHSC5OTOF3rJhK`}
function numOfWords() { return input.children.length; }
function numOfCharacters(wordIndex = 0) { return input.children[wordIndex].children.length; }

function getCharacter(wordIndex, letterIndex) {
  return input.children[wordIndex].children[letterIndex];
}

function hasCursor(wordIndex, letterIndex) {
  return input.children[wordIndex].children[letterIndex].classList.length === 2;
}

function typeCharacter(character = randomLetter()) {
  fireEvent.keyDown(input, { key: character });
}

function typeSpace() { typeCharacter(" "); }

function arrowLeft() { typeCharacter("ArrowLeft"); }

function arrowRight() { typeCharacter("ArrowRight"); }

function typeBackspace() { typeCharacter("Backspace"); }

beforeEach(() => {
  jest.useFakeTimers();
  const { getByTestId } = render(
    <ThesaurusInput keyboardCallback={_=>_} />,
  );
  input = getByTestId("input");  
  axios.jsonp.mockImplementation(()=>{
    console.log("this mock is being called")
    return Promise.resolve(mockThesaurusResponseData)
  })
})

afterEach(cleanup)

test("When a character is entered, an axios request is made with that word", () => {
  const someLetter = randomLetter();
  const correctURL = generateURL(someLetter);
  typeCharacter(someLetter);
  jest.runAllTimers();
  console.log(input.children[0].innerHTML)
  console.log(input.innerHTML)
  expect(axios.jsonp).toBeCalledWith(correctURL, {"timeout": 3500});  
})

test("getSynonym is not called until the user is done typing", () => {
  //type
  //check that the settimeout for get synonym exists
  //type
  //prove that it was cleared and is a different timer for set timeout
  //fast forward 
  //prove it works
})


test("Typingspaces doesn't call getSynonym", () => {
  // typeCharacter();
  // jest.runAllTimers();
  // expect(axios.jsonp).toHaveBeenCalledTimes(1);

  // typeSpace();
  // jest.runAllTimers();
  // expect(axios.jsonp).toHaveBeenCalledTimes(1);
})

// test("Choosing a synonym from the dropdown replaces the word with a synonym", ()=>{

// test("When a word has no synonyms nothing happens")

test("When a letter is added to a word, a new getSynonym request is made", () => {
  // typeCharacter();
  // jest.runAllTimers();
  // expect(axios.jsonp).toHaveBeenCalledTimes(1);

  // typeCharacter();
  // jest.runAllTimers();
  // expect(axios.jsonp).toHaveBeenCalledTimes(2);
})

test("When a letter is removed from a word, a new getSynonym request is made", () => {
  // typeCharacter();
  // typeCharacter();
  // jest.runAllTimers();
  // expect(axios.jsonp).toHaveBeenCalledTimes(1);

  // typeBackspace();
  // jest.runAllTimers();
  // expect(axios.jsonp).toHaveBeenCalledTimes(2);

})

// test("When a space splits a word into 2, getSynonym is called twice")

