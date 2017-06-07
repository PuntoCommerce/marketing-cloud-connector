'use strict';

/**
 * @module communication/util/trigger
 */

var Mail = require('dw/net/Mail');
var Logger = require('dw/system/Logger');

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
 * Resolves promise with a {{status: string}} Response object. At a minimum it should contain a status string: OK= indicates success, ERROR= indicates failure, anything else also indicates failure
 * @param {string} hookID
 * @param {SynchronousPromise} promise
 * @param {module:communication/util/trigger~CustomerNotification} data
 * @param {Function} [cb] Optional callback, is called with the created trigger instance and the data object
 * @returns {SynchronousPromise}
 */
function sendTrigger(hookID, promise, data, cb){
    if (promise.isPending()) {
        // Ensure SiteID is provided
        data.SiteID = require('dw/system/Site').current.ID;
        data.StoreHomeLink = require('dw/web/URLUtils').httpHome();

        Logger.debug('MC hook {0} executed', hookID);
        var trigger = require(module.cartridge).trigger(hookID);
        trigger.newMessage(data);

        if (cb && typeof(cb) === 'function') {
            cb(trigger, data);
        }

        var result = trigger.send();

        var obj = {
            status: result.ok ? 'OK' : 'ERROR'
        };
        promise.resolve(obj);
    }
    return promise;
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
