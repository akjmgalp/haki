/*** HAKI: The Tool for runtime verification of JavaScript MVC Applications.
 * @authors Ibrahim Bilge, Aysu Betin Can
 * @version v1.0.0
 * @link https://github.com/thebilge/haki
 * @license GNU
 */
(function (window, angular, undefined) {
	'use strict';

    var utility = {};
    utility.contains = function (arr, item) {
        for (var i = 0; i < arr.length; i++) {
            if (angular.equals(arr[i], item)) {
                return true;
            }
        }
        return false;
    };
    utility.isUndefined = function (obj) {
        return typeof obj === 'undefined';
    };

	window.hakiLogFile = [];

	var analyzedStates = [];

	var haki = {};

    //* -> Types and attributes to ignore
	haki.ignoreList = {type: [], attribute: []};

	//* -> Available execution strategies
	haki.HAKI_MODES = {

		/**
		 * Developer should run the tool manuelly using global api
		 */
		MANUEL: "MANUEL",

		/**
		 * Default, The tool will run automatically for every state
		 * when application transit to that state for the first time
		 */
		AUTO_ONCE: "AUTO_ONCE",

		/**
		 * The tool will run automatically for every state,
		 * when application transit to that state
		 */
		AUTO_ALWAYS: "AUTO_ALWAYS",

		/**
		 * Not Recommended, The tool will run automatically for every state,
		 * when the application loaded.
		 */
		ALL: "ALL"
	};
	
    //* -> Available expected attribute types
    haki.types = {
        OBJECT: "object",
        STRING: "string",
        NUMBER: "number",
        BOOLEAN: "boolean",
        FUNCTION: "function",
        ARRAY: "Array",
        DATE: "Date",
        FILE: "File",
        UNKNOWN: "Unknown"
    };

	/**
	* Sets the execution strategy
	* @param {string} hakiMode
	* @see haki.HAKI_MODES
	*/
	haki.setMode = function (hakiMode) {
		haki.mode = hakiMode;
		console.log("Haki mode changed to " + hakiMode);
	};

	/**
	* Disables the runtime verification for given type
	* @param {string} type
	*/
	haki.ignoreType = function (type) {
		haki.ignoreList.type.push(type);
	};

	/**
	* Disables the runtime verification for given attribute
	* @param {string} attributeName
	*/
	haki.ignoreAttribute = function (attributeName) {
		haki.ignoreList.attribute.push(attributeName);
	};

	/**
	* Executes the runtime verification for given state
	* It will run for current state, If state is undefined
	* @param {string} stateName
	*/
	haki.run = function (stateName) {
		if (!utility.isUndefined(haki.analyzer)) {
            haki.analyzer.analyze(stateName);
        }
	};
	window.haki = haki;

	var builtinAttributeList = [
		{name: "ng-model", types: [haki.types.STRING, haki.types.NUMBER, haki.types.OBJECT, haki.types.ARRAY, haki.types.DATE, haki.types.FILE]},
		{name: "ng-bind", types: [haki.types.STRING, haki.types.NUMBER]},
		{name: "ng-bind-html", types: [haki.types.STRING]},
		{name: "ng-bind-template", types: [haki.types.STRING]},
		{name: "ng-repeat", types: [haki.types.ARRAY]},
		{name: "ng-options", types: [haki.types.ARRAY]},
		{name: "ng-show", types: [haki.types.BOOLEAN]},
		{name: "ng-hide", types: [haki.types.BOOLEAN]},
		{name: "ng-if", types: [haki.types.BOOLEAN]},
		{name: "ng-checked", types: [haki.types.BOOLEAN]},
		{name: "ng-disabled", types: [haki.types.BOOLEAN]},
		{name: "ng-change", types: [haki.types.FUNCTION]},
		{name: "ng-click", types: [haki.types.FUNCTION]},
		{name: "ng-dblclick", types: [haki.types.FUNCTION]},
		{name: "ng-focus", types: [haki.types.FUNCTION]},
		{name: "ng-blur", types: [haki.types.FUNCTION]},
		{name: "ng-success", types: [haki.types.FUNCTION]},
		{name: "ng-error", types: [haki.types.FUNCTION]},
		{name: "ng-class", types: [haki.types.OBJECT]},
		{name: "ng-style", types: [haki.types.OBJECT]},
		{name: "ng-controller", types: [haki.types.STRING]},
		{name: "ng-form", types: [haki.types.STRING]},
		{name: "ng-include", types: [haki.types.STRING]},
		{name: "ng-src", types: [haki.types.STRING]},
		{name: "ng-href", types: [haki.types.STRING]},
		{name: "ng-maxlength", types: [haki.types.NUMBER]},
		{name: "ng-minlength", types: [haki.types.NUMBER]}
	];

	var customAttributeList = [];

	angular.module('ngHaki', ['ui.router'])
		.factory('HakiAnalyzer', ['HakiParser', 'HakiTypeChecker', 'HakiDefinitionChecker',
			function (HakiParser, HakiTypeChecker, HakiDefinitionChecker) {

				var log = function (msg, type) {
					if (utility.isUndefined(type)) {
                        console.info(msg);
                    } else {
						console[type](msg);
					}
					window.hakiLogFile.push(msg);
				};

				var HakiAnalyzer = function () {
					var analyzer = {};

					var processTheAttribute = function (attributeToTest, rootElement) {
                        var testElements = rootElement.find("[" + attributeToTest.name + "]");
                        for (var j = 0; j < testElements.length; j++) {

                            var elementToTest = angular.element(testElements[j]);
                            var attributeValueToTest = elementToTest.attr(attributeToTest.name);
                            var evaluatedValueToTest = HakiParser.parse(elementToTest, attributeToTest, attributeValueToTest);

                            if (HakiDefinitionChecker.isInvalid(elementToTest, attributeToTest, evaluatedValueToTest)) {
                                log("--- Found: '" + attributeValueToTest + "', for attribute: '" + attributeToTest.name + "', on html element '" + elementToTest + "', is NOT defined.");
                                continue;
                            }

                            if (HakiTypeChecker.isInvalid(elementToTest, attributeToTest, evaluatedValueToTest)) {
                                log("--- Found: '" + attributeValueToTest + "', for attribute: '" + attributeToTest.name + "', on html element '" + elementToTest + "', has WRONG type (" + typeof evaluatedValueToTest + ").");
                            }
                        }
                    };

					analyzer.analyze = function (state, rootElement) {
						var isAutoOnce = haki.mode === haki.HAKI_MODES.AUTO_ONCE;
						
						if (isAutoOnce && utility.contains(analyzedStates, state)) {
							return;
						}
						if (isAutoOnce) {
							analyzedStates.push(state);
						}
						
						log("Haki analyzing state: " + state + "...");

						for (var i = 0; i < builtinAttributeList.length; i++) {
                            var attributeToTest = builtinAttributeList[i];
                            if (!utility.contains(haki.ignoreList.attribute, attributeToTest)) {
                                processTheAttribute(attributeToTest, rootElement);
                            }
                        }

                        for (var i = 0; i < customAttributeList.length; i++) {
                            var attributeToTest = customAttributeList[i];
                            if (!utility.contains(haki.ignoreList.attribute, attributeToTest)) {
                                processTheAttribute(attributeToTest, rootElement);
                            }
                        }

					};

					return analyzer;
				};
				return HakiAnalyzer;
			}
		])

		.service('HakiParser', ['$parse',
			function ($parse) {
				this.parse = function (element, attribute, attributeValue) {
					var evaluatedValue;

					var funcExp = attributeValue.indexOf("(");
					if (-1 !== funcExp) {
						attributeValue = attributeValue.slice(0, funcExp);
					}

					var scope = element.scope();
					while (null !== scope) {
						evaluatedValue = $parse(attributeValue)(scope);
						if (!utility.isUndefined(evaluatedValue)) {
							return evaluatedValue;
						}
						scope = scope.$parent;
					}

					return evaluatedValue;
				};
			}
		])

		.service('HakiDefinitionChecker', [
			function () {
				this.isInvalid = function (element, attribute, evaluatedValue) {
					return null === evaluatedValue || 'null' === evaluatedValue || 'undefined' === typeof evaluatedValue;
				};
			}
		])

		.service('HakiTypeChecker', [
			function () {
				this.isInvalid = function (element, attribute, evaluatedValue) {
					var type = haki.types.UNKNOWN;

					if (angular.isString(evaluatedValue)) {
						type = haki.types.STRING;
					} else if (angular.isObject(evaluatedValue)) {
						type = haki.types.OBJECT;
					} else if (angular.isNumber(evaluatedValue)) {
						type = haki.types.NUMBER;
					} else if (angular.isFunction(evaluatedValue)) {
						type = haki.types.FUNCTION;
					} else if (angular.isArray(evaluatedValue)) {
						type = haki.types.ARRAY;
					} else if (angular.isDate(evaluatedValue)) {
						type = haki.types.DATE;
					} else if ("boolean" === typeof evaluatedValue) {
						type = haki.types.BOOLEAN;
					}
					return !utility.contains(attribute.types, type);
				};
			}
		])

		.run(['$rootScope', '$timeout', 'HakiAnalyzer',
			function ($rootScope, $timeout, HakiAnalyzer) {

				$rootScope.$on("$stateChangeSuccess", function (event, toState) {
					haki.currentState = toState;
				});
				
				$rootScope.$on('$viewContentLoaded', function (e) {
					var toElement = $(document.body).find("[ui-view]");

					if (utility.isUndefined(haki.currentState)) {
						return;
					}

					var analyzer = new HakiAnalyzer();
                    if (haki.mode !== haki.HAKI_MODES.MANUEL) {
                        analyzer.analyze(haki.currentState.name, toElement);
                    }

                    //* -> Hook for the global haki.run function
					window.haki.analyzer = analyzer;
				});
			}
		])

		.config(['$injector', '$compileProvider',
			function ($injector, $compileProvider) {
                //* -> Default execution strategy
                window.haki.mode = haki.HAKI_MODES.AUTO_ONCE;

                window.haki.ignoreAttribute("type");
                window.haki.ignoreAttribute("title");

                var orjDirectiveFunction = $compileProvider.directive;
                $compileProvider.directive = function registerDirective(name, directiveFactory) {
                    var directive = $injector.invoke(directiveFactory);
                    if (directive.restrict && angular.isString(directive.restrict) && /[E]/.test(directive.restrict)) {
                        if (directive.scope && angular.isObject(directive.scope)) {

                            for (var attribute in directive.scope) {
                                if (directive.scope.hasOwnProperty(attribute)) {
									var attributeValue = directive.scope[attribute];

									var attributeName, expectedTypes;
									if (attributeValue.length === 1) {
										attributeName = attribute;
									} else {
										attributeName = attributeValue.slice(1, attributeValue.length);
									}

									var attributeTypeSymbol = attributeValue.slice(0, 1);
									if (attributeTypeSymbol === '=') {
										expectedTypes = [haki.types.OBJECT, haki.types.ARRAY, haki.types.DATE, haki.types.FILE];
									} else if (attributeTypeSymbol === '@') {
										expectedTypes = [haki.types.STRING, haki.types.NUMBER, haki.types.BOOLEAN];
									} else if (attributeTypeSymbol === '&') {
										expectedTypes = [haki.types.FUNCTION];
									} else {
										expectedTypes = [haki.types.UNKNOWN];
									}

                                    customAttributeList.push({name: attributeName, types: expectedTypes});
                                }
                            }

						}
                    }

                    //* -> Run orjinal directive function after the pre-work
                    orjDirectiveFunction(name, directiveFactory);
                };
        	}
		]);

})(window, window.angular);