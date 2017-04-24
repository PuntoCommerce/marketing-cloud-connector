'use strict';

var sendTrigger = require('./util/trigger').sendTrigger;
var hookPath = 'app.communication.account.';

/**
 * Trigger account created notification
 * @param {CustomerNotification} data
 * @returns {{status: string}}
 */
function created(data) {
    var hookID = hookPath+ 'created';
    return sendTrigger(data);
}

/**
 * Trigger account updated notification
 * @param {CustomerNotification} data
 * @returns {{status: string}}
 */
function updated(data) {
    var hookID = hookPath+ 'updated';
    return sendTrigger(data);
}

/**
 * Trigger password changed notification
 * @param {CustomerNotification} data
 * @returns {{status: string}}
 */
function passwordChanged(data) {
    var hookID = hookPath+ 'passwordChanged';
    return sendTrigger(data);
}

/**
 * Trigger password reset notification
 * @param {CustomerNotification} data
 * @returns {{status: string}}
 */
function passwordReset(data) {
    var hookID = hookPath+ 'passwordReset';
    return sendTrigger(data);
}

/**
 * Trigger account locked out notification
 * @param {CustomerNotification} data
 * @returns {{status: string}}
 */
function lockedOut(data) {
    var hookID = hookPath+ 'lockedOut';
    return sendTrigger(data);
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
