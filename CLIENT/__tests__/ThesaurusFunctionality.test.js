/* eslint-disable */
import { render, fireEvent, cleanup, getNodeText } from "react-testing-library";
import React from "react";
import axios from "axios-jsonp-pro";
import ThesaurusInputConstructor from "../reusableComponents/ThesaurusInput.jsx";
const ThesaurusInput = ThesaurusInputConstructor("TESTKEY")
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

function generateURL(word){return `http://thesaurus.altervista.org/thesaurus/v1?word=${word}&language=en_US&output=json&key=TESTKEY`}
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
  axios.jsonp.mockClear(0);
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

test("When a character is entered, an axios request is made", () => {
  jest.useFakeTimers();
  const someLetter = randomLetter();
  const correctURL = generateURL(someLetter);
  typeCharacter(someLetter);
  jest.runAllTimers();
  expect(axios.jsonp).toBeCalledWith(correctURL, {"timeout": 3500});  
})

test("When a character is entered, a synonym list appears on under the word", (done) => {
  jest.useFakeTimers();
  typeCharacter();
  jest.runAllTimers();
  jest.useRealTimers();
  //honestly, it's not totally clear to me why this set timeout helps... 
  //I think triggering it in some other way would add more complexity.
  //Let's save it for a refactor
  setTimeout(() => {
    expect(hasSynonymList()).toBe(true);
    done();
  }, 50);
})


test("synonyms don't appear until the user has stopped typing for 1 second", (done) => {
  jest.useRealTimers();
  typeCharacter();
  setTimeout(() => {
    //800 seconds later, no synonym list
    expect(hasSynonymList()).toBe(false);
    typeCharacter();
    setTimeout(() => {
      //1000 seconds later, a synonym list
      expect(hasSynonymList()).toBe(true);
      done();
    }, 1000);
  }, 800);
})


test("Spaces don't get a synonym list", (done) => {
  jest.useFakeTimers();
  typeSpace();
  jest.runAllTimers();
  jest.useRealTimers();
  setTimeout(() => {
    expect(hasSynonymList()).toBe(false);
    done();
  }, 50);
})

test("Choosing a synonym from the dropdown replaces the word with a synonym", (done) => {
  jest.useFakeTimers();
  const someLetter = randomLetter();
  typeCharacter(someLetter);
  jest.runAllTimers();
  jest.useRealTimers();
  setTimeout(() => {

    let firstLetterInWord = getNodeText(input.children[0].children[0]);
    expect(firstLetterInWord).toBe(someLetter);

    const firstElementOfDropdown = input.children[0].children[1].children[0];
    click(firstElementOfDropdown);
    setTimeout(() => {

      firstLetterInWord = getNodeText(input.children[0].children[0]);
      expect(firstLetterInWord).toBe("1");

      done()
    }, 500);
  }, 50);
})

test("When a word has no synonyms, nothing gets added to the dom", () => {
  axios.jsonp.mockImplementation(() => {
    return Promise.reject()
  })
  jest.useFakeTimers();
  typeCharacter();
  jest.runAllTimers();
  jest.useRealTimers();
  setTimeout(() => {
    expect(hasSynonymList()).toBe(false);
    done();
  }, 50);
})

test("When a letter is added to a word, a new getSynonym request is made", () => {  
  jest.useFakeTimers();
  typeCharacter();
  jest.runAllTimers();
  expect(axios.jsonp).toBeCalledTimes(1);
  arrowLeft();
  typeCharacter();
  jest.runAllTimers();
  expect(axios.jsonp).toBeCalledTimes(2);
})

test("When a letter is removed from a word, a new getSynonym request is made", () => {
  jest.useFakeTimers();
  typeCharacter();
  typeCharacter();
  jest.runAllTimers();
  expect(axios.jsonp).toHaveBeenCalledTimes(1);
  typeBackspace();
  jest.runAllTimers();
  expect(axios.jsonp).toHaveBeenCalledTimes(2);
})

test("When a space splits a word into 2, getSynonym is called twice", () => {
  jest.useFakeTimers();
  typeCharacter();
  jest.runAllTimers();
  typeCharacter();
  jest.runAllTimers();
  expect(axios.jsonp).toHaveBeenCalledTimes(2);
  arrowLeft();
  typeSpace();
  jest.runAllTimers();
  expect(axios.jsonp).toHaveBeenCalledTimes(4);

})

