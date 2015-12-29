(function () {
    "use strict";

    var utility = require("./../main/utility.js");
    var assert = require("chai").assert;

    describe("Utility Tests", function () {

        it("returns true for undefined is undefined", function () {
            var obj = {};
            assert.isTrue(utility.isUndefined(obj.prop));
        });

        it("returns false for defined is undefined", function () {
            var obj = {prop: "prop"};
            assert.isFalse(utility.isUndefined(obj.prop));
        });
    });

}());