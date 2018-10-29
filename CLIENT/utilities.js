function synonymsFormatter(synonymsArrays){
    console.log("this is synynons arrays ", synonymsArrays)
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
    console.log("this is the result of the ultilite ", allSynonymsLists);

    return allSynonymsLists;

}

module.exports.synonymsFormatter = synonymsFormatter;

