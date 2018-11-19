import convertWordArrayIntoString from "./convertWordArrayIntoString.js";
import convertWordsStateIntoString from "./convertWordsStateIntoString.js";
import handleCursorMove from "./handleCursorMove.js";
import splitStringIntoLettersArray from "./splitStringIntoLettersArray.js";
import synonymsFormatter from "./synonymsFormatter.js";
import handleOnChangeCallback from "./handleOnChangeCallback.js";
import getSynonyms from "./getSynonyms.js";
import determineClassName from './determineClassName.js';
import handleWordUpdate from './handleWordUpdate.js';
import handleSynonymClick from './handleSynonymClick.js';
import handleSpaceBar from './handleSpaceBar.js';
import handleKeyboardInput from './handleKeyboardInput.js';
import handleDelete from './handleDelete.js';
import handleArrows from './handleArrows';

export default function bindAndAssignHelpersToContext(context) {
  const modules = {
    convertWordArrayIntoString,
    convertWordsStateIntoString,
    handleCursorMove,
    splitStringIntoLettersArray,
    synonymsFormatter,
    handleOnChangeCallback,
    getSynonyms,
    determineClassName,
    handleWordUpdate,
    handleSynonymClick,
    handleSpaceBar,
    handleKeyboardInput,
    handleDelete,
    handleArrows
  }

  Object.keys(modules).forEach((key)=>{
    context[key] = modules[key].bind(context);
  })
}