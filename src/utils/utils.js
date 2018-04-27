/**
 * Validate if a string is valid or not
 * @param stringToTest The string to validate
 * @param allowEmpty If a empty string is valid or no
 * @return {boolean} If the string is valid
 */
const isValidString = (stringToTest, allowEmpty = false) => {
  if (typeof(stringToTest) !== 'string') return false;

  if (stringToTest.length === 0 && allowEmpty === false) return false;

  return true;
};

export { isValidString };
