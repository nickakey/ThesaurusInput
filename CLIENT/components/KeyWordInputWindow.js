import _ from "underscore";
import React from "react";


const KeyWordInputWindow = ({numberOfWordSlots, handleChange, handleSubmit, addNewWordSlot}) => (
    <div>
        <form>
            {_.range(numberOfWordSlots).map((num)=>{
                return <input key={num} onChange={(e)=>{handleChange(num, e.target.value)}}></input>
            })}
            <div onClick={handleSubmit}> SUBMIT </div>
            <div onClick={addNewWordSlot}> ADD NEW WORD SLOT </div>
        </form>
    </div>
)

export default KeyWordInputWindow;