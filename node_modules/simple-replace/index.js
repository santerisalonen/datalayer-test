var simpleReplace = module.exports = function (text, objectHash) {
    text = text || "";
    objectHash = objectHash || {};
    var placeholerDefaultValueRegex = /([^:-]+)+:-(.*)+/;
    var placeholderRegex = /(?:\$\{([^}]+)+\})+?/g;
    var defaultValueMatches;
    var placeholderReplace = function (placeholder, configVar) {
        if (typeof objectHash[configVar] !== 'undefined') {
            return objectHash[configVar];
        } else if (!configVar.match(placeholerDefaultValueRegex)) {
            return placeholder;
        } else {
            defaultValueMatches = configVar.match(placeholerDefaultValueRegex);
            if (typeof objectHash[defaultValueMatches[1]] !== 'undefined') {
                return objectHash[defaultValueMatches[1]];
            } else {
                return defaultValueMatches[2];
            }
        }
    };
    return text.replace(placeholderRegex, placeholderReplace);
}