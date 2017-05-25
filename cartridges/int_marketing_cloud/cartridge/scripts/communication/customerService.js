'use strict';

/**
 * @module communication/customerService
 */

var sendTrigger = require('./util/trigger').sendTrigger;
var hookPath = 'app.communication.customerService.';

/**
 * Trigger a customer service notification
 * @param {module:communication/util/trigger~CustomerNotification} data
 * @returns {{status: string}}
 */
function contactUs(data) {
    // TODO: Perform some logic to override sender & recipient email values
    return sendTrigger(hookPath + 'contactUs', data);
}

/**
 * Declares attributes available for data mapping configuration
 * @returns {Object} Map of hook function to an array of strings
 */
function triggerDefinitions() {
    return {
        contactUs: {
            description: 'Contact Us trigger',
            attributes: [
                'CurrentForms.contactus.myquestion',
                'CurrentForms.contactus.firstname',
                'CurrentForms.contactus.lastname',
                'CurrentForms.contactus.email',
                'CurrentForms.contactus.phone',
                'CurrentForms.contactus.ordernumber',
                'CurrentForms.contactus.comment'
            ]
        }
    };
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

// non-hook exports
module.exports.triggerDefinitions = triggerDefinitions;