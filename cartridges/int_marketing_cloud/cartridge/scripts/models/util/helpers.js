'use strict';

/**
 * @module models/util/helpers
 */

/**
 * Checks if submitted value type is an Object (and not an Array)
 * @param {*} obj Object to be checked
 * @returns {boolean}
 * @static
 */
function isObject(obj) {
    return typeof obj === 'object' && !Array.isArray(obj);
}

/**
 * Uppercases first char of string
 * @param {string} str String to uppercased
 * @returns {string}
 * @static
 */
function ucfirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Returns an object's preferred value, based on what DW object type it represents
 * @param {*} obj Object to use for value return
 * @returns {*}
 * @static
 */
function dwValue(obj) {
    if (empty(obj) || !isObject(obj)) {
        return obj;
    }

    if (obj instanceof (require('dw/web/FormField'))) {
        return obj.value;
    } else if (obj instanceof (require('dw/value/EnumValue'))) {
        return obj.displayValue;
    } else if (obj instanceof (require('dw/value/Money'))) {
        return obj.valueOrNull;
    } else if (obj instanceof (require('dw/util/Decimal'))) {
        return obj.valueOf();
    } else if (obj instanceof (require('dw/util/Calendar'))) {
        return require('dw/util/StringUtils').formatCalendar(obj);
    } else if (obj instanceof (require('dw/util/Collection'))) {
        return obj.toArray();
    }

    return obj;
}

exports.isObject = isObject;
exports.ucfirst = ucfirst;
exports.dwValue = dwValue;