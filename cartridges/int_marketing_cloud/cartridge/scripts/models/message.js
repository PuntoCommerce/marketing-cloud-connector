'use strict';

function messageToJson(obj) {
    var newObject = {};
    var ucfirst = function(string){ return string.charAt(0).toUpperCase() + string.slice(1); };
    var ucprop;
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            switch(prop) {
                case '_private':
                    continue;
                case 'options':
                    ucprop = 'OPTIONS';
                    break;
                default:
                    ucprop = ucfirst(prop);
                    break;
            }

            if (obj[prop] && typeof obj[prop] === 'object' && prop !== 'subscriberAttributes') {
                newObject[ ucprop ] = messageToJson(obj[prop]);
            } else {
                newObject[ ucprop ] = obj[prop];
            }
        }
    }
    return newObject;
}

/**
 * Message class
 * @param {string} sendID ID of the entry event send definition. Either this or the customer key is required.
 * @param {string} customerKey CustomerKey of the entry event send definition. Either this or the SendID is required.
 * @constructor
 */
function Message(sendID, customerKey) {
    if (empty(sendID) && empty(customerKey)) {
        throw new Error('sendID or customerKey is required to create a new message.');
    }

    this._private = {
        sendID: sendID,
        sendKey: customerKey
    };
    this.from = {
        address: '',
        name: ''
    };
    this.to = {
        address: '',
        subscriberKey: '',
        contactAttributes: {
            subscriberAttributes: {
            }
        }
    };
    this.options = {
        requestType: 'ASYNC'
        /* There are multiple possible options available, but not exposing until we have use cases
         * https://developer.salesforce.com/docs/atlas.en-us.mc-apis.meta/mc-apis/options.htm
         */
        /*callsInConversation: 0,
        client: '',
        conversationID: '',
        priority: 'Low', // Low, Medium, High
        queuePriority: 'Low', // Low, Medium, High
        saveOptions: '',
        scheduledTime: '',
        sendResponseTo: '',
        sequenceCode: ''*/
    };
}

Message.prototype = {
    /**
     * Set FROM details
     * @param {string} address Sender email address
     * @param {string} name Sender name
     * @returns {Message}
     */
    setFrom: function(address, name) {
        this.from.address = address;
        this.from.name = name;
        return this;
    },
    /**
     * Set TO details
     * @param {string} address Recipient email address
     * @returns {Message}
     */
    setTo: function(address) {
        this.to.address = address;
        this.to.subscriberKey = address;
        return this;
    },
    /**
     * Set ASYNC on/off
     * @param {boolean} isAsync Set true if message should send async
     * @returns {Message}
     */
    setAsync: function(isAsync) {
        this.options.requestType = (isAsync ? 'A' : '') + 'SYNC';
        return this;
    },
    /**
     * Set a custom subscriber attribute
     * @param {string} key
     * @param {*} value
     * @returns {Message}
     */
    setSubscriberAttribute: function(key, value) {
        this.to.contactAttributes.subscriberAttributes[key] = value;
        return this;
    },
    /**
     * Builds up a formatted object for JSON.stringify()
     * @returns {object}
     */
    toJSON: function() {
        return messageToJson(this);
    }
};

module.exports = Message;
