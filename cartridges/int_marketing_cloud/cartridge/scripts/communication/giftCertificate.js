'use strict';

var sendTrigger = require('./util/trigger').sendTrigger;

/**
 * Trigger a gift certificate notification
 * @param {CustomerNotification} data
 * @returns {{status: string}}
 */
function sendGiftCertificate(data) {
    return sendTrigger(data);
}

module.exports = require('dw/system/HookMgr').callHook(
    'app.communication.handler.initialize',
    'initialize',
    require('./handler').handlerID,
    'app.communication.giftCertificate',
    {
        sendGiftCertificate: sendGiftCertificate
    }
);
