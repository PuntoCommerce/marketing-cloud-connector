'use strict';

var sendTrigger = require('./util/trigger').sendTrigger;

/**
 * Trigger an order confirmation notification
 * @param {CustomerNotification} data
 * @returns {{status: string}}
 */
exports.confirmation = function(data) {
    var msg = require('int_marketing_cloud').message();
    return sendTrigger(data);
};
