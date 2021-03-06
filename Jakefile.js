/* globals jake:false, desc:false, task:false, complete:false, fail:false */

(function () {
    "use strict";

    var semver = require("semver");

    desc("Default task");
    task("default", ["version", "test"], function () {
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
    
    desc("Runs tests");
    task("test", function () {
        jake.exec("node node_modules/mocha/bin/mocha src/test/**/_*.js", {interactive: true}, complete);
    }, {async: true} );

}());