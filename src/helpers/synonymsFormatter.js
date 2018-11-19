
export function synonymsFormatter(synonyms) {
  const formattedSynonyms = [];

  if (!synonyms) {
    return formattedSynonyms.push([undefined]);
  }

  synonyms.response.forEach(({
    list: {
      synonyms: synonymsString
    }
  }) => {
    synonymsString.split("|").forEach(synonym => {
      formattedSynonyms.push(synonym.split(" ")[0]);
    });
  });
  return formattedSynonyms;
}
  