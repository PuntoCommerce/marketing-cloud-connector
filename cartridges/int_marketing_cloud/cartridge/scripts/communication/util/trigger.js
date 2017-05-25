'use strict';

/**
 * @module communication/util/trigger
 */

var Mail = require('dw/net/Mail');

/**
 * @typedef {Object} CustomerNotification
 * @property {string} fromEmail The email address the communication is sent from
 * @property {string|array} toEmail The email address the communication is sent to
 * @property {string} subject The communication subject
 * @property {string} messageBody The body of the communication to send
 * @property {Object} params Object containing additional parameters for usage by the hook
 * @property {external:dw/web/Forms} params.CurrentForms The forms available in current session
 * @property {external:dw/web/HTTPParameterMap} params.CurrentHttpParameterMap The parameters in current request
 * @property {external:dw/customer/Customer} params.CurrentCustomer The current customer
 */

/**
 * Trigger a customer notification
 * @param {string} hookID
 * @param {module:communication/util/trigger~CustomerNotification} data
 * @returns {{status: string}} Response object. At a minimum it should contain a status string: OK= indicates success, ERROR= indicates failure, anything else also indicates failure
 */
function sendTrigger(hookID, data){
    var trigger = require(module.cartridge).trigger(hookID);
    trigger.newMessage(data);

    var result = trigger.send();

    return {
        status: result.ok ? 'OK' : 'ERROR'
    };
}

exports.sendTrigger = sendTrigger;

/**
 * @external dw/web/Forms
 * @see https://documentation.demandware.com/DOC1/index.jsp?topic=%2Fcom.demandware.dochelp%2FDWAPI%2Fscriptapi%2Fhtml%2Fapi%2Fclass_dw_web_Forms.html
 */
/**
 * @external dw/web/HTTPParameterMap
 * @see https://documentation.demandware.com/DOC1/index.jsp?topic=%2Fcom.demandware.dochelp%2FDWAPI%2Fscriptapi%2Fhtml%2Fapi%2Fclass_dw_web_HTTPParameterMap.html
 */
/**
 * @external dw/customer/Customer
 * @see https://documentation.demandware.com/DOC1/index.jsp?topic=%2Fcom.demandware.dochelp%2FDWAPI%2Fscriptapi%2Fhtml%2Fapi%2Fclass_dw_customer_Customer.html
 */
