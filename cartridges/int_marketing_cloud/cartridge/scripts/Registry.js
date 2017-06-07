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
 * @type {{authToken: module:int_marketing_cloud.authToken, event: module:int_marketing_cloud.event, message: module:int_marketing_cloud.message, trigger: module:int_marketing_cloud.trigger}}
 * @exports int_marketing_cloud
 */
var	Registry = {
    /**
     * @returns {module:models/authToken~AuthToken} Instance of AuthToken
     */
    authToken : function () {
        var model = require(path +'models/authToken');
        return new model();
    },
    /**
     * @param {string} contactKey The ID that uniquely identifies a subscriber/contact
     * @param {string} eventKey The EventDefinitionKey in Event Administration after the event is created and saved
     * @returns {module:models/event~Event} Instance of Event
     */
    event : function (contactKey, eventKey) {
        var model = require(path +'models/event');
        return new model(contactKey, eventKey);
    },
    /**
     * @param {string} customerKey CustomerKey of the entry event send definition. Either this or the SendID is required.
     * @param {string} sendID ID of the entry event send definition. Either this or the customer key is required.
     * @returns {module:models/message~Message} Instance of Message
     */
    message : function (customerKey, sendID) {
        var model = require(path +'models/message');
        return new model(customerKey, sendID);
    },
    /**
     * @param {string} hookID The trigger hook ID
     * @returns {module:models/trigger~Trigger}
     */
    trigger : function (hookID) {
        var model = require(path +'models/trigger');
        return new model(hookID);
    }
};

module.exports = Registry;
