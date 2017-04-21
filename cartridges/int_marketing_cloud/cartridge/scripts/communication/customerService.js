'use strict';

var sendTrigger = require('./util/trigger').sendTrigger;

/**
 * Trigger a customer service notification
 * @param {CustomerNotification} data
 * @returns {{status: string}}
 */
exports.contactUs = function(data) {
    return sendTrigger(data);
};
