/**
 * Removes line feeds (\n) and carriage returns (\r) from a string.
 * @param {string} str - A string.
 * @returns {string} The string without line feed and carriage return characters.
 */
exports.removeLineFeeds = function(str) {
    return str.replace(/[\r\n]/g, "");
}

exports.toTitleCase = function(str) {
    return str.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
}

exports.capitilizeFirstInSentence = function(str) {
    return str.replace(/(^\w|\. \w)/g, match => match.toUpperCase());
}

/**
* Capitilizes the first letter of a given string
* @param {string} str - A string
* @returns {string} Returns the string with its first character upper cased.
*/
exports.capitilizeFirst = function(str) {
    return str[0].toUpperCase() + str.slice(1);
}