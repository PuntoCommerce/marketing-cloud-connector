'use strict';

var sendTrigger = require('./util/trigger').sendTrigger;
var hookPath = 'app.communication.account.';

/**
 * Trigger account created notification
 * @param {CustomerNotification} data
 * @returns {{status: string}}
 */
function created(data) {
    return sendTrigger(hookPath + 'created', data);
}

/**
 * Trigger account updated notification
 * @param {CustomerNotification} data
 * @returns {{status: string}}
 */
function updated(data) {
    return sendTrigger(hookPath + 'updated', data);
}

/**
 * Trigger password changed notification
 * @param {CustomerNotification} data
 * @returns {{status: string}}
 */
function passwordChanged(data) {
    return sendTrigger(hookPath + 'passwordChanged', data);
}

/**
 * Trigger password reset notification
 * @param {CustomerNotification} data
 * @returns {{status: string}}
 */
function passwordReset(data) {
    return sendTrigger(hookPath + 'passwordReset', data);
}

/**
 * Trigger account locked out notification
 * @param {CustomerNotification} data
 * @returns {{status: string}}
 */
function lockedOut(data) {
    return sendTrigger(hookPath + 'lockedOut', data);
}

/**
 * Declares attributes available for data mapping configuration
 * @returns {Object} Map of hook function to an array of strings
 */
function triggerDefinitions() {
    var mergeCustomer = function (arr, k) {
        if (empty(k)) {
            k = 'Customer';
        }
        return [].concat(arr, [
            k + '.anonymous',
            k + '.authenticated',
            k + '.ID',
            k + '.note',
            k + '.registered',
            k + '.profile.birthday',
            k + '.profile.companyName',
            k + '.profile.customerNo',
            k + '.profile.email',
            k + '.profile.fax',
            k + '.profile.female',
            k + '.profile.firstName',
            k + '.profile.gender.displayValue',
            k + '.profile.gender.value',
            k + '.profile.jobTitle',
            k + '.profile.lastLoginTime',
            k + '.profile.lastName',
            k + '.profile.lastVisitTime',
            k + '.profile.male',
            k + '.profile.nextBirthday',
            k + '.profile.phoneBusiness',
            k + '.profile.phoneHome',
            k + '.profile.phoneMobile',
            k + '.profile.preferredLocale',
            k + '.profile.previousLoginTime',
            k + '.profile.previousVisitTime',
            k + '.profile.salutation',
            k + '.profile.secondName',
            k + '.profile.suffix',
            k + '.profile.taxIDMasked',
            k + '.profile.taxIDType.displayValue',
            k + '.profile.taxIDType.value',
            k + '.profile.title'
        ]);
    };
    return {
        created: {
            description: 'Account Created trigger',
            attributes: mergeCustomer([], 'Customer')
        },
        updated: {
            description: 'Account Updated trigger',
            attributes: mergeCustomer([], 'Customer')
        },
        passwordChanged: {
            description: 'Password Changed trigger',
            attributes: mergeCustomer([], 'Customer')
        },
        passwordReset: {
            description: 'Password Reset trigger',
            attributes: mergeCustomer([
                'ResetPasswordToken'
            ], 'Customer')
        },
        lockedOut: {
            description: 'Account Locked trigger',
            attributes: mergeCustomer([], 'TempCustomer')
        }
    };
}

module.exports = require('dw/system/HookMgr').callHook(
    'app.communication.handler.initialize',
    'initialize',
    require('./handler').handlerID,
    'app.communication.account',
    {
        created: created,
        updated: updated,
        passwordChanged: passwordChanged,
        passwordReset: passwordReset,
        lockedOut: lockedOut
    }
);

// non-hook exports
module.exports.triggerDefinitions = triggerDefinitions;