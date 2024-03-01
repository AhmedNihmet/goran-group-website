/**
 * Truncates a given string to a specified number of words.
 * @param {string} str - The string to be truncated.
 * @param {number} numberOfWords - The number of words to truncate the string to.
 * @returns {string} The truncated string.
 */
export const truncateString = (str, numberOfWords) => {
  if (!str) return "";

  const words = str.split(" ");
  const truncatedWords = words.slice(0, numberOfWords);
  const truncatedStr = truncatedWords.join(" ");

  return truncatedWords.length < words.length
    ? `${truncatedStr}...`
    : truncatedStr;
};