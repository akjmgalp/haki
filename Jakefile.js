(function () {
    "use strict";

    var semver = require("semver");

    desc("Default task");
    task("default", ["version"], function () {
        console.log("\n\nBUILD OK");
    });
    
    desc("Checks node version");
    task("version", function () {
        var actualVersion = process.version;
        var expectedVersion = require("./package.json").engines.node;

        if (semver.neq(expectedVersion, actualVersion)) {
            fail("Incorrect node version: expected " + expectedVersion + ", but was " + actualVersion);
        }
    });

}());