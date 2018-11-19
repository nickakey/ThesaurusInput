import React from 'react';
import { placeHolderText, cursorBeforeElement } from "../styles/Placeholder.style";

const Placeholder = ({ customPlaceholder }) => (
  <div id="placeHolder" className={`${placeHolderText} ${cursorBeforeElement}`}>
    {customPlaceholder ? customPlaceholder : "Start typing..."}
  </div>
)

export default Placeholder;