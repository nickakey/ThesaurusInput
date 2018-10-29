function synonymsFormatter(synonymsArrays){
    const allSynonymsLists = [];

    synonymsArrays.forEach((synonymsArray)=>{
        const formattedSynonyms = [];
        synonymsArray.response.forEach(({list : {synonyms: synonymsString}})=>{
            synonymsString.split("|")
            .forEach((synonym)=>{
                formattedSynonyms.push(synonym.split(" ")[0]);
            })
        })
        allSynonymsLists.push(formattedSynonyms);
    })

    return allSynonymsLists;

}

module.exports.synonymsFormatter = synonymsFormatter;

