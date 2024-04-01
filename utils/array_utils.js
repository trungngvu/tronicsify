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

export function generateRegexFromKeywordArrays(keywords, specialKeywords) {
  // Escape special characters in keywords
  const escapedKeywords = keywords.map((keyword) =>
    keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  );

  // Create regex pattern
  let pattern = "(?:\\b(?:";
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
      var wordRegExp = new RegExp("\\b" + word + "\\b", "i");

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
  pattern += ")\\b)";

  // Construct regex
  return new RegExp(pattern, "i"); // 'i' flag for case-insensitive matching
}
