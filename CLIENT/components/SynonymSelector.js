import _ from "underscore";
import React from "react";


const SynonymSelector = ({synonyms, handleSynonymClick, handleCloseMenu}) => (
    <div>
        <form>
            {synonyms.map((synonym, index)=>{
                return <div onClick={()=>{handleSynonymClick(synonym)}}key={index}> {synonym} </div>
            })}
            <span onClick={()=>{handleCloseMenu()}}>close</span>
        </form>
    </div>
)

export default SynonymSelector;