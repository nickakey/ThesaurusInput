import React from "react";
import { render, fireEvent, cleanup } from "react-testing-library";
import randomLetter from "random-letter";
import ThesaurusInput from "../src/reusableComponents/ThesaurusInput.jsx";

let onChange;
let input;

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
  onChange = jest.fn();
  const { getByTestId } = render(
    <ThesaurusInput apikey="TESTKEY" onChange={onChange} />,
  );
  input = getByTestId("input");
});

afterEach(cleanup);

// TYPING LETTERS
test("Typing a letter adds a new word and letter to the input", () => {
  typeCharacter();
  typeCharacter();
  expect(numOfCharacters()).toBe(2);
});

test("Typing a letter moves the cursor to after the new letter", () => {
  typeCharacter();
  expect(hasCursor(0, 0)).toBe(true);
  typeCharacter();
  expect(hasCursor(0, 0)).toBe(false);
  expect(hasCursor(0, 1)).toBe(true);
});

test("Typing spacebar adds a new word to with a single space in it", () => {
  expect(numOfWords()).toBe(0);
  typeSpace();
  expect(numOfWords()).toBe(1);
  expect(getCharacter(0, 0).innerHTML).toBe("&nbsp;");
});

test("When I insert new letters into the middle of the word, they become part of that word", () => {
  expect(numOfWords()).toBe(0);
  typeCharacter();
  typeCharacter();
  expect(numOfWords()).toBe(1);
  fireEvent.keyDown(input, { key: "Arrow Left" });
  typeCharacter();
  typeCharacter();
  typeCharacter();
  expect(numOfWords()).toBe(1);
});

// TYPING SPACES

test("If multiple spaces are typed, they are grouped into the same word", () => {
  // TODO - this should also handle spaces in the middle and on the left of words...
  expect(numOfWords()).toBe(0);
  typeCharacter();
  typeCharacter();
  typeSpace();
  typeSpace();
  typeSpace();
  expect(numOfWords()).toBe(2);
  fireEvent.keyDown(input, { key: "ArrowLeft" });
  fireEvent.keyDown(input, { key: "ArrowLeft" });
  fireEvent.keyDown(input, { key: "ArrowLeft" });
  typeSpace();
  expect(numOfWords()).toBe(2);
  fireEvent.keyDown(input, { key: "ArrowRight" });
  typeSpace();
  expect(numOfWords()).toBe(2);
});

test("Typing a space moves the cursor to after the new space", () => {
  typeCharacter();
  expect(hasCursor(0, 0)).toBe(true);
  typeSpace();
  expect(hasCursor(0, 0)).toBe(false);
  expect(hasCursor(1, 0)).toBe(true);
});

test("When I insert space into the middle of a word, I split the origial word into 2 words and create new word for space", ()=>{
  typeCharacter();
  typeCharacter();
  typeCharacter();
  typeCharacter();
  expect(numOfWords()).toBe(1);
  arrowLeft();
  arrowLeft();
  typeSpace(" ");
  expect(numOfWords()).toBe(3);
});

// DELETING

test("Delete removes a single letter", () => {
  typeCharacter();
  typeCharacter();
  expect(numOfCharacters()).toBe(2);
  typeBackspace();
  expect(numOfCharacters()).toBe(1);
});

test("Deleting all letters in word removes whole word", () => {
  typeCharacter();
  expect(numOfWords()).toBe(1);
  typeBackspace();
  expect(numOfWords()).toBe(0);
});

test("Deleting a space inbetween 2 words combines them into one word", () => {
  typeCharacter();
  typeCharacter();
  typeSpace();
  typeCharacter();
  typeCharacter();
  expect(numOfWords()).toBe(3);
  arrowLeft();
  arrowLeft();
  typeBackspace();
  expect(numOfWords()).toBe(1);
});

test("Deleting makes the cursor move back a character", () => {
  typeCharacter();
  typeCharacter();
  expect(hasCursor(0, 0)).toBe(false);
  expect(hasCursor(0, 1)).toBe(true);
  typeBackspace();
  expect(hasCursor(0, 0)).toBe(true);
});

test("Deleting at maximum left does nothing", () => {
  typeBackspace();
  typeBackspace();
  typeBackspace();
  typeCharacter();
  arrowLeft();
  typeBackspace();
  typeBackspace();
});

// ARROW KEYS

test("Arrow Keys move the cursor left and right within a word", () => {
  typeCharacter();
  typeCharacter();
  typeCharacter();
  expect(hasCursor(0, 2)).toBe(true);
  arrowLeft();
  expect(hasCursor(0, 1)).toBe(true);
  arrowRight();
  expect(hasCursor(0, 2)).toBe(true);
});

test("Arrow Keys move the cursor left and right over words", () => {
  typeCharacter();
  typeCharacter();
  typeSpace();
  typeCharacter();
  typeCharacter();
  expect(hasCursor(2, 1)).toBe(true);
  arrowLeft();
  arrowLeft();
  arrowLeft();
  arrowLeft();
  expect(hasCursor(0, 0)).toBe(true);
  arrowRight();
  arrowRight();
  arrowRight();
  arrowRight();
  expect(hasCursor(2, 1)).toBe(true);
});

test("If I try and move the cursor right at max right, nothing happens", () => {
  arrowRight();
  arrowRight();
  arrowRight();
  typeCharacter();
  arrowRight();
  arrowRight();
  arrowRight();
});

test("If I try and move the cursor left at max left, nothing happens", () => {
  arrowLeft();
  arrowLeft();
  arrowLeft();
  typeCharacter();
  arrowLeft();
  arrowLeft();
  arrowLeft();
});

test("If I type in a bunch of random weird buttons nothing happens", () => {
  typeCharacter();
  typeCharacter("ArrowUp");
  typeCharacter("ArrowDown");
  typeCharacter("Shift");
  typeCharacter("Alt");
  typeCharacter("Tab");
  expect(numOfWords()).toBe(1);
});

