'use strict';

// handlerID can be any unique identifier
exports.handlerID = module.cartridge;

/**
 * Register communication handler
 * @param {object} registerHandler
 */
exports.registerHandler = function(registerHandler) {
    registerHandler[this.handlerID] = {
        name: 'Marketing Cloud Connector',
        id: this.handlerID,
        cartridge: module.cartridge,
        hooks: require('~/cartridge/scripts/hooks.json').hooks
    };
};