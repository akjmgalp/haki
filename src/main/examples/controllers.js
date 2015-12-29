(function () {
    "use strict";

    var utility = require("utility.js");

    var addController = function (controllerName, controllerFunction) {
        utility.setProperty(exports, controllerName, controllerFunction);
    };

    addController('testController0', function($scope) {
        $scope.user = {name: "ibrahim0"};
    });

    addController('testControllerA', function($scope) {
        $scope.level = { number: 6 };
        $scope.user.name = "ibrahimA";
    });

    addController('testControllerB', function($scope) {
        $scope.user.name = "ibrahimB";
    });

    addController('testControllerAA', function($scope) {
        $scope.user.name = "ibrahimAA";
    });

    addController('testControllerAB', function($scope) {
        $scope.user.name = "ibrahimAB";
    });

    addController('testControllerBA', function($scope) {
        $scope.user.name = "ibrahimBA";
    });

    addController('testControllerBAA', function($scope) {
        $scope.user.name = "ibrahimBAA";
    });
    
}());