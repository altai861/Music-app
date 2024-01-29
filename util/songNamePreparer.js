
function replaceSpacesWithHyphens(inputString) {
    // Use a regular expression to replace spaces, commas, and semicolons with hyphens globally
    return inputString.replace(/[\s,;]+/g, '-');
}

module.exports = {
    replaceSpacesWithHyphens
}