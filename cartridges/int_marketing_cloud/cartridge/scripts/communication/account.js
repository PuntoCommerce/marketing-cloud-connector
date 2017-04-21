'use strict';

var sendTrigger = require('./util/trigger').sendTrigger;
var hookPath = 'app.communication.account.';

/**
 * Trigger account created notification
 * @param {CustomerNotification} data
 * @returns {{status: string}}
 */
exports.created = function(data) {
    dw.system.Logger.error(module.cartridge);
    var hookID = hookPath+ 'created';
//    return sendTrigger(data);
};

/**
 * Trigger account updated notification
 * @param {CustomerNotification} data
 * @returns {{status: string}}
 */
exports.updated = function(data) {
    var hookID = hookPath+ 'updated';
    return sendTrigger(data);
};

/**
 * Trigger password changed notification
 * @param {CustomerNotification} data
 * @returns {{status: string}}
 */
exports.passwordChanged = function(data) {
    var hookID = hookPath+ 'passwordChanged';
    return sendTrigger(data);
};

/**
 * Trigger password reset notification
 * @param {CustomerNotification} data
 * @returns {{status: string}}
 */
exports.passwordReset = function(data) {
    var hookID = hookPath+ 'passwordReset';
    return sendTrigger(data);
};

/**
 * Trigger account locked out notification
 * @param {CustomerNotification} data
 * @returns {{status: string}}
 */
exports.lockedOut = function(data) {
    var hookID = hookPath+ 'lockedOut';
    return sendTrigger(data);
};
