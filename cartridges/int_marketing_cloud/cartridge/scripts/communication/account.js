'use strict';

/**
 * @module communication/account
 */

var URLUtils = require('dw/web/URLUtils');

var hookPath = 'app.communication.account.';

/**
 * Wrapper to trigger.sendTrigger() to allow common variable injection for all hooks in the file
 * @param hookID
 * @param promise
 * @param data
 * @returns {SynchronousPromise}
 */
function sendTrigger(hookID, promise, data){
    data.AccountHomeLink = URLUtils.https('Account-Show');
    return require('./util/send').sendTrigger(hookID, promise, data);
}

/**
 * Trigger account created notification
 * @param {SynchronousPromise} promise
 * @param {module:communication/util/trigger~CustomerNotification} data
 * @returns {SynchronousPromise}
 */
function created(promise, data) {
    return sendTrigger(hookPath + 'created', promise, data);
}

/**
 * Trigger account updated notification
 * @param {SynchronousPromise} promise
 * @param {module:communication/util/trigger~CustomerNotification} data
 * @returns {SynchronousPromise}
 */
function updated(promise, data) {
    return sendTrigger(hookPath + 'updated', promise, data);
}

/**
 * Trigger password changed notification
 * @param {SynchronousPromise} promise
 * @param {module:communication/util/trigger~CustomerNotification} data
 * @returns {SynchronousPromise}
 */
function passwordChanged(promise, data) {
    return sendTrigger(hookPath + 'passwordChanged', promise, data);
}

/**
 * Trigger password reset notification
 * @param {SynchronousPromise} promise
 * @param {module:communication/util/trigger~CustomerNotification} data
 * @returns {SynchronousPromise}
 */
function passwordReset(promise, data) {
    data.ResetPasswordLink = URLUtils.https('Account-SetNewPassword', 'Token', data.params.ResetPasswordToken);
    return sendTrigger(hookPath + 'passwordReset', promise, data);
}

/**
 * Trigger account locked out notification
 * @param {SynchronousPromise} promise
 * @param {module:communication/util/trigger~CustomerNotification} data
 * @returns {SynchronousPromise}
 */
function lockedOut(promise, data) {
    data.params.Customer = data.params.TempCustomer;
    return sendTrigger(hookPath + 'lockedOut', promise, data);
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
            'AccountHomeLink',
            k + '.anonymous',
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
                'ResetPasswordToken',
                'ResetPasswordLink'
            ], 'Customer')
        },
        lockedOut: {
            description: 'Account Locked trigger',
            attributes: mergeCustomer([], 'Customer')
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