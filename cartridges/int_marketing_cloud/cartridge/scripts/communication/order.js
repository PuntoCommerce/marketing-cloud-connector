'use strict';

var sendTrigger = require('./util/trigger').sendTrigger;

/**
 * Trigger an order confirmation notification
 * @param {CustomerNotification} data
 * @returns {{status: string}}
 */
function confirmation(data) {
    var msg = require('int_marketing_cloud').message();
    return sendTrigger(data);
}

module.exports = require('dw/system/HookMgr').callHook(
    'app.communication.handler.initialize',
    'initialize',
    require('./handler').handlerID,
    'app.communication.order',
    {
        confirmation: confirmation
    }
);
