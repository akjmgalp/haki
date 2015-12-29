(function () {
    "use strict";

    exports.types = {
        OBJECT: "object",
        STRING: "string",
        NUMBER: "number",
        BOOLEAN: "boolean",
        FUNCTION: "function",
        ARRAY: "array",
        DATE: "date",
        FILE: "file"
    };

    exports.list = [
        {name: "ng-bind", types: [exports.types.OBJECT, exports.types.STRING, exports.types.NUMBER]},
        {name: "ng-model", types: [exports.types.OBJECT, exports.types.STRING, exports.types.NUMBER]},
        {name: "ng-if", types: [exports.types.BOOLEAN]},
        {name: "ng-show", types: [exports.types.BOOLEAN]},
        {name: "ng-hide", types: [exports.types.BOOLEAN]}
    ];

}());