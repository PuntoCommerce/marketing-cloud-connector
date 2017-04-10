'use strict';

/**
 * Registry.js
 */

var path = '/int_marketing_cloud/cartridge/scripts/';
var	Registry = {
    /**
     * @returns {authToken} Instance of authToken
     */
    authToken : function() {
        var authTokenModel = require(path +'models/authToken');
        return new authTokenModel();
    },
    /**
     * @param {string} sendID ID of the entry event send definition. Either this or the customer key is required.
     * @param {string} customerKey CustomerKey of the entry event send definition. Either this or the SendID is required.
     * @returns {Message} Instance of Message
     */
    message : function(sendID, customerKey) {
        var messageModel = require(path +'models/message');
        return new messageModel(sendID, customerKey);
    }
};

module.exports = Registry;
