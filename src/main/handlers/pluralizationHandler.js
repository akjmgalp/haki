(function () {
    "use strict";

    exports.findPluralizedVariableList = function (mainContent) {
        var pluralizedVariableList = [];

        var startIndex = mainContent.search("{{");
        var endIndex = mainContent.search("}}");
        while (startIndex !== -1 && startIndex < endIndex) {
            var pluralizedVariable = mainContent.substring(startIndex + 2, endIndex);
            pluralizedVariableList.push(pluralizedVariable);

            mainContent = mainContent.substring(endIndex + 2, mainContent.length);
            startIndex = mainContent.search("{{");
            endIndex = mainContent.search("}}");
        }

        return pluralizedVariableList;
    };

}());