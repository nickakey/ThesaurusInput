import React from 'react';
import { dropDownCSS, synonymCSS } from "../styles/Dropdown.style.js";

const Dropdown = ({ synonyms, handleSynonymClick, wordIndex }) => {
  if (synonyms && synonyms.length) {
    return ( 
      <span className={dropDownCSS} key={wordIndex}>
        {synonyms.map((synonym, k) => (
          <div
            key={k} 
            onClick={() => { handleSynonymClick(synonym, wordIndex); }}
            className={synonymCSS}
          >
            {synonym}
          </div>
        ))}
      </span>
    );
  } else {
    return null
  }
};

export default Dropdown;
