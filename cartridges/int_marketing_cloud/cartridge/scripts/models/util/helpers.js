'use strict';

function isObject(obj) {
    return typeof obj === 'object' && !Array.isArray(obj);
}

function ucfirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

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