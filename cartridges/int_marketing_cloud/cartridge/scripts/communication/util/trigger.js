'use strict';

var Mail = require('dw/net/Mail');

/**
 * @typedef {Object} CustomerNotification
 * @property {string} fromEmail The email address the communication is sent from
 * @property {string|array} toEmail The email address the communication is sent to
 * @property {string} subject The communication subject
 * @property {string} messageBody The body of the communication to send
 * @property {dw/web/Forms} params.CurrentForms The forms available in current session
 * @property {dw/web/HTTPParameterMap} params.CurrentHttpParameterMap The parameters in current request
 * @property {dw/customer/Customer} params.CurrentCustomer The current customer
 */

/**
 * Trigger a customer notification
 * @param {string} hookID
 * @param {CustomerNotification} data
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
