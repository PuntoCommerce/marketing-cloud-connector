'use strict';

/**
 * @module models/trigger
 */

/**
 * Custom object name
 * @const {string}
 * @private
 */
var customObjectName = 'MarketingCloudTriggers';
var helpers = require('./util/helpers');

/**
 * Fetches trigger definition from Custom Object
 * @param {string} hookID
 * @returns {module:dw/object/CustomAttributes}
 * @see [dw/object/CustomAttributes]{@link https://documentation.demandware.com/DOC1/index.jsp?topic=%2Fcom.demandware.dochelp%2FDWAPI%2Fscriptapi%2Fhtml%2Fapi%2Fclass_dw_object_CustomAttributes.html}
 */
function getTriggerDefinitionObject(hookID) {
    var com = require('dw/object/CustomObjectMgr'),
        triggerDef = com.getCustomObject(customObjectName, hookID);
    if (empty(triggerDef)) {
        require('dw/system/Transaction').wrap(function(){
            triggerDef = com.createCustomObject(customObjectName, hookID);
        });
    }
    return triggerDef.getCustom();
}

/**
 * Merges attribute JS objects in place, preserving old values
 * @param {Object} newAttributes
 * @param {Object} oldAttributes
 */
function mergeAttributes(newAttributes, oldAttributes) {
    if (oldAttributes) {
        for (var attribute in oldAttributes) {
            if (oldAttributes.hasOwnProperty(attribute)) {
                newAttributes[attribute] = oldAttributes[attribute];
            }
        }
    }
}

/**
 * Expands Subscriber Attributes from JSON definition
 * @param {module:dw/object/CustomAttributes} definition
 * @returns {Object}
 * @see [dw/object/CustomAttributes]{@link https://documentation.demandware.com/DOC1/index.jsp?topic=%2Fcom.demandware.dochelp%2FDWAPI%2Fscriptapi%2Fhtml%2Fapi%2Fclass_dw_object_CustomAttributes.html}
 */
function expandAttributes(definition) {
    var attributes = definition.subscriberAttributes;
    try {
        attributes = attributes ? JSON.parse(attributes) : {};
    } catch(e) {
        // Catch exception from invalid JSON
        attributes = {};
    }
    return attributes;
}

/**
 * Returns trigger definition for a hook
 * @param {string} hookID
 * @param {Object} attributes
 * @returns {{description: string, attributes: {}}}
 */
function getTriggerDefinition(hookID, attributes) {
    var splitHookID = hookID.split('.').slice(-2);
    var hookFile = splitHookID[0];
    var hookFunction = splitHookID[1];

    var description = '';
    var hookAttributes = {};
    var triggerDefinitions = require('../communication/'+ hookFile).triggerDefinitions();
    if (triggerDefinitions && triggerDefinitions.hasOwnProperty(hookFunction)) {
        if (triggerDefinitions[hookFunction].hasOwnProperty('description')) {
            description = triggerDefinitions[hookFunction]['description'];
        }
        // build object from array
        if (triggerDefinitions[hookFunction].hasOwnProperty('attributes')) {
            triggerDefinitions[hookFunction]['attributes'].forEach(function (k) {
                hookAttributes[k] = '';
            });
        }
    }
    mergeAttributes(hookAttributes, attributes);

    return {
        description: description,
        attributes: hookAttributes
    };
}

/**
 * Returns parameter value from data (uses recursion)
 * @param {string} attr Period-delimited path to a parameter
 * @param {Object} data
 * @returns {*}
 */
function getParamValue(attr, data) {
    var value;
    if (attr.lastIndexOf('.') === -1 && data.hasOwnProperty(attr)) {
        value = data[attr];
    } else {
        var attrs = attr.split('.');
        var obj = data;
        attrs.forEach(function(k, i, arr){
            if (empty(obj) || !helpers.isObject(obj)) {
                value = obj;
                return;
            }

            if (i === 0) {
                if (k !== 'params' && obj.hasOwnProperty(k)) {
                    obj = obj[k];
                } else if (obj.params.hasOwnProperty(k)) {
                    obj = obj.params[k];
                }
            } else {
                if (k in obj) {
                    obj = obj[k];
                }
            }
            if (i === arr.length-1) {
                value = helpers.dwValue(obj);
            }
        });
    }
    return value;
}

/**
 * Rebuilds trigger definition in Custom Object
 * @alias module:models/trigger.Trigger#rebuild
 */
function rebuildTriggerDefinition() {
    var tx = require('dw/system/Transaction');
    var definition = getTriggerDefinition(this.hookID, this.attributes);
    this.attributes = definition.attributes;

    tx.begin();
    try {
        if (empty(this.definition.description)) {
            this.definition.description = definition.description;
        }
        this.definition.subscriberAttributes = JSON.stringify(this.attributes, null, 4);
        tx.commit();
    } catch (e) {
        tx.rollback();
    }
}

/**
 * Returns a new Message instance
 * @param {module:communication/util/trigger~CustomerNotification} data Data to populate the Message with.
 * @returns {module:models/message~Message}
 * @alias module:models/trigger.Trigger#newMessage
 */
function newMessage(data){
    var messageModel = require('./message');
    var msg = new messageModel(this.definition.customerKey);

    var toEmail = Array.isArray(data.toEmail) ? data.toEmail[0] : data.toEmail;
    msg.setFrom(data.fromEmail).setTo(toEmail);

    for (var attr in this.attributes) {
        if (this.attributes.hasOwnProperty(attr) && !empty(this.attributes[attr])) {
            if (Array.isArray(this.attributes[attr])) {
                this.attributes[attr].forEach(function(a){
                    msg.setSubscriberAttribute(a, getParamValue(attr, data));
                });
            } else {
                msg.setSubscriberAttribute(this.attributes[attr], getParamValue(attr, data));
            }
        }
    }
    this.message = msg;

    return this.message;
}

/**
 * Sends a trigger message
 * @returns {module:dw/svc/Result}
 * @alias module:models/trigger.Trigger#send
 * @see [dw/svc/Result]{@link https://documentation.demandware.com/DOC1/index.jsp?topic=%2Fcom.demandware.dochelp%2FDWAPI%2Fscriptapi%2Fhtml%2Fapi%2Fclass_dw_svc_Result.html}
 */
function sendMessage() {
    if (!this.isEnabled()) {
        throw new Error('Marketing Cloud trigger {0} for hook {1} is not enabled.',
            this.definition.customerKey,
            this.hookID
        );
    }
    if (empty(this.message)) {
        throw new Error('A new message needs to be created first, using newMessage()');
    }

    var msgSvc = require('dw/svc/ServiceRegistry').get('marketingcloud.rest.messaging.send');
    return msgSvc.call(this.message);
}

/**
 * Trigger constructor
 * @param {string} hookID
 * @constructor
 */
function Trigger(hookID) {
    /**
     * The instance hook ID
     * @type {string}
     */
    this.hookID = hookID;
    /**
     * Definition object
     * @type {module:dw/object/CustomAttributes}
     */
    this.definition = getTriggerDefinitionObject(hookID);
    /**
     * Expanded attributes from trigger definition
     * @type {Object}
     */
    this.attributes = expandAttributes(this.definition);
    /**
     * The current Message instance
     * @type {module:models/message~Message}
     */
    this.message = null;

    /**
     * Returns whether this trigger is enabled
     * @returns {boolean}
     */
    this.isEnabled = function(){
        return this.definition.enabled === true;
    };

    this.rebuild = function(){
        return rebuildTriggerDefinition.apply(this, arguments);
    };

    this.newMessage = function(data){
        return newMessage.apply(this, arguments);
    };

    this.send = function(){
        return sendMessage.apply(this, arguments);
    };
}

module.exports = Trigger;
