
export function splitStringIntoLettersArray(string) {
  return string.split("").reduce((acc, el, i) => {
    acc.push({
      value: el
    });
    return acc;
  }, []);
}
  