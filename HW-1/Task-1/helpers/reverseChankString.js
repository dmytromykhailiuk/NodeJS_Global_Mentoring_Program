const reverseString = (string) => string.split("").reverse().join("");

export const reverseChankString = (chankString) => {
  const separator = chankString[chankString.length - 1];
  return reverseString(chankString.slice(0, -1)).concat(separator);
};
