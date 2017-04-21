'use strict';

var Mail = require('dw/net/Mail');
var ArrayList = require('dw/util/ArrayList');

/**
 * @typedef {Object} CustomerNotification
 * @property {string} fromEmail The email address the communication is sent from
 * @property {string|array} toEmail The email address the communication is sent to
 * @property {string} subject The communication subject
 * @property {string} messageBody The body of the communication to send
 */

/**
 * Trigger a customer notification
 * @param {CustomerNotification} data
 * @returns {{status: string}} Response object. At a minimum it should contain a status string: OK= indicates success, ERROR= indicates failure, anything else also indicates failure
 */
function sendTrigger(data){
    var email = new Mail();
    email.setTo(new ArrayList(data.toEmail));
    email.setFrom(data.fromEmail);
    email.setSubject(data.subject);
    email.setContent(data.messageBody, 'text/html', 'UTF-8');
    var status = email.send();

    return {
        status: !status.isError() ? 'OK' : 'ERROR'
    };
}

exports.sendTrigger = sendTrigger;
