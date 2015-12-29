(function () {
    "use strict";

    var haki = require("../main/haki.js");
    var assert = require("chai").assert;

    describe("Examples", function () {

        it("this is an example", function () {
            assert.isTrue(haki.startAnalyze("myFile.html"));
        });
    });

}());