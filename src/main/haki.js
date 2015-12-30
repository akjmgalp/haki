(function () {
    "use strict";

    var $ = require('jquery');
    var utility = require("./utility.js");
    var controllers = require("./examples/controllers.js");
    var attributes = require("./resources/attributes.js");

    var log = function(str, left, top) {
        console.info("<label class='log' style='margin-left: " + left + "px; margin-top: " + top + "px;'>" + str + "</label>");
    };

    exports.startAnalyze = function (filename) {
        console.log("File is analyzed: " + filename);
        return true;


        var $document; //** NEED TO READ HTML here. **//

        var controllerElementList = $document.find("[ng-controller]");
        for (var i = 0; i < controllerElementList.length; i++) {
            var controllerElement = $(controllerElementList[i]);

            log("Searching the controller: " + controllerElement.attr("ng-controller"), 0, 10);

            for (var j = 0; j < attributes.list.length; j++) {
                var attributeToAnalyze = attributes.list[j].name;
                var elementListToAnalyze = controllerElement.find("[" + attributeToAnalyze + "]");

                var elementToAnalyze;
                for (var k = 0; k < elementListToAnalyze.length; k++) {
                    elementToAnalyze = $(elementListToAnalyze[k]);

                    if (elementToAnalyze.closest("[ng-controller]").attr("ng-controller") === controllerElement.attr("ng-controller")) {
                        var attributeValueToAnalyze = elementToAnalyze.attr(attributeToAnalyze);
                        var parsedAttributeValueToAnalyze = $parse(attributeValueToAnalyze)(controllerElement.scope());

                        log("Found the attribute: " + attributeToAnalyze + " with the value: " + attributeValueToAnalyze, 20, 0);
                        log("Evaluating in its scope... " + parsedAttributeValueToAnalyze, 30, 0);
                    }

                }

            }

        }

    };

}());