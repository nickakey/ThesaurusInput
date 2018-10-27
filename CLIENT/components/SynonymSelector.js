import _ from "underscore";
import React from "react";


const SynonymSelector = ({synonyms, handleSynonymClick}) => (
    <div>
        <form>
            {synonyms.map((synonym, index)=>{
                return <div onClick={()=>{handleSynonymClick(synonym)}}key={index}> {synonym} </div>
            })}
        </form>
    </div>
)

export default SynonymSelector;