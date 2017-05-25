'use strict';

/**
 * Registry.js
 */

/**
 * Cartridge script path
 * @const {string}
 * @private
 */
var path = '/int_marketing_cloud/cartridge/scripts/';

/**
 * Registry object
 * @type {{authToken: Registry.authToken, message: Registry.message, trigger: Registry.trigger}}
 * @exports int_marketing_cloud
 */
var	Registry = {
    /**
     * @returns {module:models/authToken~AuthToken} Instance of AuthToken
     */
    authToken : function () {
        var authTokenModel = require(path +'models/authToken');
        return new authTokenModel();
    },
    /**
     * @param {string} customerKey CustomerKey of the entry event send definition. Either this or the SendID is required.
     * @param {string} sendID ID of the entry event send definition. Either this or the customer key is required.
     * @returns {module:models/message~Message} Instance of Message
     */
    message : function (customerKey, sendID) {
        var messageModel = require(path +'models/message');
        return new messageModel(customerKey, sendID);
    },
    /**
     * @param {string} hookID The trigger hook ID
     * @returns {module:models/trigger~Trigger}
     */
    trigger : function (hookID) {
        var triggerModel = require(path +'models/trigger');
        return new triggerModel(hookID);
    }
};

module.exports = Registry;
