export const compareArrays = (array1, array2) => {
  if (array1.length !== array2.length) return false;
  const newArr = (object) =>
    JSON.stringify(
      Object.keys(object)
        .sort()
        .map((key) => [key, object[key]])
    );
  array1 = new Set(array1.map(newArr));

  return array2.every((object) => array1.has(newArr(object)));
};

export const filterArray = (array, property) => {
  return array.filter((item) => item.name == property).map((s) => s.value);
};

export const removeDuplicates = (array) => {
  return [...new Set(array)];
};

export const randomize = (array) => {
  return array.sort(() => 0.5 - Math.random());
};

export function generateRAMCapacityRegex(range = [1, 1024]) {
  if (range.length === 0) {
    range = [1, 1024]; // Default range from 1GB to 1TB
  }

  const [min, max] = range;
  const minPower = Math.ceil(Math.log2(min));
  const maxPower = Math.floor(Math.log2(max));

  // Constructing the regex pattern
  let regexPattern = "";
  for (let i = minPower; i <= maxPower; i++) {
    const capacity = Math.pow(2, i);
    regexPattern += capacity + "GB|";
  }
  regexPattern = regexPattern.slice(0, -1); // Removing the last '|'
  regexPattern = "\\b(?![^(]*\\))(" + regexPattern + ")\\b"; // Adding word boundaries and ignoring characters inside parentheses

  return new RegExp(regexPattern, "i");
}

export function createBusRegex(strings) {
  // If input array is null or has less than two elements, return a regex pattern matching any string
  if (
    !Array.isArray(strings) ||
    strings.length !== 2 ||
    strings.includes(null)
  ) {
    return /.*/;
  }

  const [str1, str2] = strings;

  // Remove all characters except numbers from str2
  const strippedStr2 = str2.replace(/\D/g, "");

  // Escape special characters in input strings
  const escapedStr1 = str1.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const escapedStr2 = strippedStr2.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  // Construct regex pattern
  const pattern = `^(?=.*${escapedStr1})(?=.*${escapedStr2}).*`;

  return new RegExp(pattern);
}

export function generateRegexFromKeywordArrays(keywords, specialKeywords) {
  // Create regex pattern
  let pattern = "(?:(?:";
  keywords.forEach((keyword, index) => {
    const parts = keyword.split(/\s+/); // Split keyword by whitespace
    if (parts.length === 1) {
      pattern += `${parts[0]}`;
    } else {
      pattern += parts.map((part) => `${part}`).join("\\s+");
    }
    // Iterate over the array elements
    for (var i = 0; i < specialKeywords.length; i++) {
      var word = specialKeywords[i];
      // Construct a regular expression pattern to check for each word
      var wordRegExp = new RegExp(word, "i");

      // Test if the keyword contains the current word from the array
      if (!wordRegExp.test(keyword)) {
        // If the keyword doesn't contain the current word
        pattern += "(?!\\s+" + word + ")"; // Ensure the word doesn't follow
      }
    }
    if (index !== keywords.length - 1) {
      pattern += "|";
    }
  });
  pattern += "))";

  // Construct regex
  return new RegExp(pattern, "i"); // 'i' flag for case-insensitive matching
}
