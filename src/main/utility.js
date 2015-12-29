(function () {
    "use strict";

    /////* --- OBJECT UTILS --- */////

    /**
     * Returns true if obj is object.
     * @param obj
     * @returns {boolean}
     */
    exports.isObject = function (obj) {
        return exports.isDefinedAndNotNull(obj) && typeof obj === 'object';
    };

    /**
     * Returns true if obj is string.
     * @param obj
     * @returns {boolean}
     */
    exports.isString = function (obj) {
        return exports.isDefinedAndNotNull(obj) && typeof obj === 'string';
    };

    /**
     * Returns true if obj is number.
     * @param obj
     * @returns {boolean}
     */
    exports.isNumber = function (obj) {
        return exports.isDefinedAndNotNull(obj) && typeof obj === 'number';
    };

    /**
     * Returns true if obj is not a number.
     * @param obj
     * @returns {boolean}
     */
    exports.isNaN = function (obj) {
        return exports.isDefinedAndNotNull(obj) && isNaN(obj);
    };

    /**
     * Returns true if obj is boolean.
     * @param obj
     * @returns {boolean}
     */
    exports.isBoolean = function (obj) {
        return exports.isDefinedAndNotNull(obj) && typeof obj === 'boolean';
    };

    /**
     * Returns true if obj is function.
     * @param obj
     * @returns {boolean}
     */
    exports.isFunction = function (obj) {
        return exports.isDefinedAndNotNull(obj) && typeof obj === 'function';
    };

    /**
     * Returns true if obj is array.
     * @param obj
     * @returns {boolean}
     */
    exports.isArray = function (obj) {
        return exports.isDefinedAndNotNull(obj) && Object.prototype.toString.call(obj) === '[object Array]';
    };

    /**
     * Returns true if obj is file list.
     * @param obj
     * @returns {boolean}
     */
    exports.isFileList = function (obj) {
        return exports.isDefinedAndNotNull(obj) && Object.prototype.toString.call(obj) === '[object FileList]';
    };

    /**
     * Returns true if obj is date.
     * @param obj
     * @returns {boolean}
     */
    exports.isDate = function (obj) {
        return exports.isDefinedAndNotNull(obj) && Object.prototype.toString.call(obj) === '[object Date]';
    };

    /**
     * Returns true if obj is null.
     * @param obj
     * @returns {boolean}
     */
    exports.isNull = function (obj) {
        return obj === null || obj === 'null';
    };

    /**
     * Returns false if obj is null.
     * @param obj
     * @returns {boolean}
     */
    exports.isNotNull = function (obj) {
        return obj !== null && obj !== 'null';
    };

    /**
     * Returns true if obj is undefined.
     * @param obj
     * @returns {boolean}
     */
    exports.isUndefined = function (obj) {
        return typeof obj === 'undefined';
    };

    /**
     * Returns false if obj is undefined.
     * @param obj
     * @returns {boolean}
     */
    exports.isDefined = function (obj) {
        return typeof obj !== 'undefined';
    };

    /**
     * Returns true if obj is defined and not null.
     * @param obj
     * @returns {boolean}
     */
    exports.isDefinedAndNotNull = function (obj) {
        return exports.isDefined(obj) && exports.isNotNull(obj);
    };

    /**
     * Returns true if obj is undefined or null.
     * @param obj
     * @returns {boolean}
     */
    exports.isUndefinedOrNull = function (obj) {
        return exports.isUndefined(obj) || exports.isNull(obj);
    };

    /**
     * Returns true if obj is defined and not null and not empty string.
     * @param obj
     * @returns {boolean}
     */
    exports.isDefinedAndNotNullAndNotEmptyString = function (obj) {
        return exports.isDefinedAndNotNull(obj) && '' !== obj;
    };

    /**
     * Returns true if obj is undefined or null or empty string.
     * @param obj
     * @returns {boolean}
     */
    exports.isUndefinedOrNullOrEmptyString = function (obj) {
        return exports.isUndefinedOrNull(obj) || '' === obj;
    };

    /////* --- ARRAY UTILS --- */////

    /**
     * Returns true if arr has no item.
     * @param arr
     * @returns {boolean}
     */
    exports.isEmpty = function (arr) {
        return 0 === arr.length;
    };

    /**
     * Returns true if arr has at least 1 item.
     * @param arr
     * @returns {boolean}
     */
    exports.isNotEmpty = function (arr) {
        return 0 < arr.length;
    };

    /**
     * Returns true if arr contains item, wrt comparator function.
     * @param arr
     * @param item
     * @param comparator (defaults to angular.equals)
     * @returns {boolean}
     */
    exports.contains = function (arr, item, comparator) {
        if (exports.isUndefined(comparator)) {
            comparator = angular.equals;
        }
        for (var i = 0; i < arr.length; i++) {
            if (comparator(arr[i], item)) {
                return true;
            }
        }

        return false;
    };

    /**
     * Returns true if arr1 includes any item in arr2.
     * @param arr1
     * @param arr2
     * @returns {boolean}
     */
    exports.containsAny = function (arr1, arr2) {
        for (var i = 0; i < arr2.length; i++) {
            if (exports.contains(arr1, arr2[i], undefined)) {
                return true;
            }
        }

        return false;
    };

    /**
     * Returns true if arr1 includes all items in arr2.
     * @param arr1
     * @param arr2
     * @returns {boolean}
     */
    exports.containsAll = function (arr1, arr2) {
        for (var i = 0; i < arr2.length; i++) {
            if (!exports.contains(arr1, arr2[i], undefined)) {
                return false;
            }
        }

        return true;
    };

    /**
     * Adds item to first index of arr.
     * @param arr
     * @param item
     * @returns {void}
     */
    exports.pushFirst = function (arr, item) {
        arr.splice(0, 0, item);
    };

    /**
     * Adds all items from arr1 to arr2.
     * @param arr1
     * @param arr2
     * @returns {void}
     */
    exports.pushAll = function (arr1, arr2) {
        for (var i = 0; i < arr1.length; i++) {
            arr2.push(arr1[i]);
        }
    };

    /**
     * Copies arr to a new array (shallow copy)
     * @param arr
     * @returns {Array}
     */
    exports.copy = function (arr) {
        var newArr = [];
        for (var i = 0; i < arr.length; i++) {
            newArr.push(arr[i]);
        }
        return newArr;
    };

    /**
     * Removes item from arr.
     * @param arr
     * @param item
     * @param comparator (defaults to angular.equals)
     * @returns {void}
     */
    exports.removeItem = function (arr, item, comparator) {
        if (exports.isUndefined(comparator)) {
            comparator = angular.equals;
        }
        var index = exports.indexOf(arr, item, comparator);
        if (index !== -1) {
            arr.splice(index, 1);
        }
    };

    /**
     * Removes all items from arr.
     * @param arr
     * @returns {void}
     */
    exports.removeAll = function (arr) {
        while (exports.isNotEmpty(arr)) {
            arr.pop();
        }
    };

    /**
     * Finds index of item in arr. Returns -1 if not found.
     * @param arr
     * @param item
     * @param comparator (defaults to angular.equals)
     * @returns {int}
     */
    exports.indexOf = function (arr, item, comparator) {
        if (exports.isUndefined(comparator)) {
            comparator = angular.equals;
        }

        for (var i = 0; i < arr.length; i++) {
            if (comparator(arr[i], item)) {
                return i;
            }
        }

        return -1;
    };

    /**
     * Extracts list of property from objectList.
     * @param arr
     * @param property
     * @returns {Array}
     */
    exports.extractListOfProperty = function (arr, property) {
        var result = [];
        for (var i = 0; i < arr.length; i++) {
            result.push(exports.getProperty(arr[i], property));
        }

        return result;
    };

    /**
     * Filter arr with the given filter function. Return new filtered array
     * @param arr
     * @param filterFunction
     * @returns {Array}
     */
    exports.filter = function (arr, filterFunction) {
        if (exports.isDefined(filterFunction)) {
            return arr.filter(filterFunction);
        }
    };

    /**
     * Returns last element of arr
     * @param arr
     * @returns {*}
     */
    exports.getLast = function (arr) {
        return arr[arr.length - 1];
    };

    /**
     * Returns string of elements of arr
     * @param arr
     * @param property
     * @param seperator
     * @returns {string}
     */
    exports.toString = function (arr, property, seperator) {
        if (exports.isUndefined(seperator)) {
            seperator = ', ';
        }

        var result = '';
        for (var i = 0; i < arr.length; i++) {
            if (exports.isDefinedAndNotNull(property)) {
                result += exports.getProperty(arr[i], property);
            } else {
                result += arr[i];
            }

            if(i !== arr.length-1) {
                result += seperator;
            }
        }

        return result;
    };

    /**
     * Sorts the arr with given comparator.
     * @param arr
     * @param comparator (defaults to angular.equals)
     * @returns {void}
     */
    exports.sort = function (arr, comparator) {
        if (exports.isDefined(comparator)) {
            arr.sort(comparator);
        } else {
            arr.sort();
        }
    };

    /////* --- REFLECTION UTILS --- */////

    /**
     * Returns property of object (can be chained property).
     * @param obj
     * @param property
     * @returns {object}
     */
    exports.getProperty = function (obj, property) {
        property = property.replace(/\[/g, '.').replace(/]/g, '');
        var props = property.split(".");

        var result = obj;
        for (var i = 0; i < props.length; i++) {
            result = result[props[i]];
        }

        return result;
    };

    /**
     * Sets property of object. If property is undefined, it is generated.
     * @param obj
     * @param property
     * @param value
     * @returns {void}
     */
    exports.setProperty = function (obj, property, value) {
        property = property.replace(/\[/g, '.').replace(/]/g, '');
        var props = property.split(".");

        for (var i = 0; i < props.length; i++) {
            if (i === props.length - 1) {
                obj[props[i]] = value;
            } else if (exports.isUndefined(obj[props[i]])) {
                obj[props[i]] = {};
            }

            obj = obj[props[i]];
        }
    };

    /////* --- JQUERY UTILS --- */////

    /**
     * Returns dom element by id
     * @param id
     * @returns {object}
     */
    exports.getElementById = function (id) {
        return document.getElementById(id);
    };

}());