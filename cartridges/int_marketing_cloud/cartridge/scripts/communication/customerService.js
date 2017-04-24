'use strict';

var sendTrigger = require('./util/trigger').sendTrigger;

/**
 * Trigger a customer service notification
 * @param {CustomerNotification} data
 * @returns {{status: string}}
 */
function contactUs(data) {
    return sendTrigger(data);
}

module.exports = require('dw/system/HookMgr').callHook(
    'app.communication.handler.initialize',
    'initialize',
    require('./handler').handlerID,
    'app.communication.customerService',
    {
        contactUs: contactUs
    }
);
