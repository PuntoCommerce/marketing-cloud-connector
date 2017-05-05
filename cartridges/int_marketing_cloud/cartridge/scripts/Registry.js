'use strict';

/**
 * Registry.js
 */

var path = '/int_marketing_cloud/cartridge/scripts/';
var	Registry = {
    /**
     * @returns {authToken} Instance of authToken
     */
    authToken : function () {
        var authTokenModel = require(path +'models/authToken');
        return new authTokenModel();
    },
    /**
     * @param {string} customerKey CustomerKey of the entry event send definition. Either this or the SendID is required.
     * @param {string} sendID ID of the entry event send definition. Either this or the customer key is required.
     * @returns {Message} Instance of Message
     */
    message : function (customerKey, sendID) {
        var messageModel = require(path +'models/message');
        return new messageModel(customerKey, sendID);
    },
    /**
     * @param {string} hookID The trigger hook ID
     * @returns {Trigger}
     */
    trigger : function (hookID) {
        var triggerModel = require(path +'models/trigger');
        return new triggerModel(hookID);
    }
};

module.exports = Registry;
