function synonymsFormatter(synonymsArray){
    const formattedSynonyms = [];
    synonymsArray.forEach(({list : {synonyms: synonymsString}})=>{
        synonymsString.split("|")
        .forEach((synonym)=>{
            formattedSynonyms.push(synonym.split(" ")[0]);
        })
    })
    return formattedSynonyms;
}

module.exports.synonymsFormatter = synonymsFormatter;

