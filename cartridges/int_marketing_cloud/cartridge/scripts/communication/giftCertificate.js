'use strict';

/**
 * @module communication/giftCertificate
 */

var sendTrigger = require('./util/trigger').sendTrigger;
var hookPath = 'app.communication.giftCertificate.';

/**
 * Trigger a gift certificate notification
 * @param {module:communication/util/trigger~CustomerNotification} data
 * @returns {{status: string}}
 */
function sendCertificate(data) {
    return sendTrigger(hookPath + 'sendCertificate', data);
}

/**
 * Declares attributes available for data mapping configuration
 * @returns {Object} Map of hook function to an array of strings
 */
function triggerDefinitions() {
    return {
        sendCertificate: {
            description: 'Send Gift Certificate trigger, used for newly purchased gift certificates',
            attributes: [
                'GiftCertificate.amount.value',
                'GiftCertificate.amount.currencyCode',
                'GiftCertificate.amount.decimalValue',
                'GiftCertificate.balance.value',
                'GiftCertificate.balance.currencyCode',
                'GiftCertificate.balance.decimalValue',
                'GiftCertificate.description',
                'GiftCertificate.giftCertificateCode',
                'GiftCertificate.recipientName',
                'GiftCertificate.recipientEmail',
                'GiftCertificate.senderName',
                'GiftCertificate.message',
                'GiftCertificate.maskedGiftCertificateCode',
                'GiftCertificate.merchantID',
                'GiftCertificate.orderNo'
            ]
        }
    };
}

module.exports = require('dw/system/HookMgr').callHook(
    'app.communication.handler.initialize',
    'initialize',
    require('./handler').handlerID,
    'app.communication.giftCertificate',
    {
        sendCertificate: sendCertificate
    }
);

// non-hook exports
module.exports.triggerDefinitions = triggerDefinitions;
