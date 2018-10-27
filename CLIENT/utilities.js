function synonymsFormatter(synonymsString){
    return synonymsString.split("|").filter((string)=>{
        return !string.includes("(generic term)");
    })
}

module.exports.synonymsFormatter = synonymsFormatter;

