import _ from "underscore";
import React from "react";


const SynonymSelector = ({synonyms}) => (
    <div>
        <form>
            {synonyms.map((synonym, index)=>{
                return <div key={index}> {synonym} </div>
            })}
        </form>
    </div>
)

export default SynonymSelector;