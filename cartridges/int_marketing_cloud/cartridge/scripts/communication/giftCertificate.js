'use strict';

var sendTrigger = require('./util/trigger').sendTrigger;

/**
 * Trigger a gift certificate notification
 * @param {CustomerNotification} data
 * @returns {{status: string}}
 */
exports.sendGiftCertificate = function(data) {
    return sendTrigger(data);
};
