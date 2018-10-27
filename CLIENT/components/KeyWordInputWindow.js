import _ from "underscore";
import React from "react";


const KeyWordInputWindow = ({numberOfInputs, handleChange, handleSubmit}) => (
    <div>
        <form>
            {_.range(numberOfInputs).map((num)=>{
                return <input key={num} onChange={(e)=>{handleChange(num, e.target.value)}}></input>
            })}
            <div onClick={handleSubmit}> SUBMIT </div>
        </form>
    </div>
)

export default KeyWordInputWindow;