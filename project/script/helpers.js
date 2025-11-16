/**
 * Project Name: Old Mike’s Car Full-Service Transaction Management System
 * Project Group: 45
 * Group Members: Lei Feng, Marina Moger
 * Description: Includes helper functions.
 * Citation: All code in this file without citation is original.
 */

/**
 * Check if the input id is valid.
 * 
 * @param {string} id - The input id.
 * @returns {boolean} True if it is valid, or False otherwise.
 */
function isValidID(id) {
  return Number.isInteger(Number(id)) && Number(id);
};

/**
 * Format the input phone number string.
 * 
 * @param {string} str - The input phone number string.
 * @returns {string} The formated phone number string.
 */
function formatPhoneNumber(str) {
  if (/^\d{10}$/.test(str)) {
    return `(${str.slice(0,3)}) ${str.slice(3,6)}-${str.slice(6)}`;
  }
  return str;
};

/**
 * Check the input string, return 'null' if it is an empty string, or
 * return the string otherwise.
 * 
 * @param {string} str - The input string.
 * @returns {string} Return 'null' if the input string is empty.
 */

function checkEmptyString(str) {
  if (str.trim() === '') {
    return null;
  }
  return str;
};

module.exports = {isValidID, formatPhoneNumber, checkEmptyString};
