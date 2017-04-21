'use strict';

/**
 * Register communication handler
 * @param {object} registerHandler
 */
exports.registerHandler = function(registerHandler) {
    // handlerID can be any unique identifier
    var handlerID = module.cartridge;
    registerHandler[handlerID] = {
        name: 'Marketing Cloud Connector',
        id: handlerID,
        cartridge: module.cartridge,
        hooks: require('~/cartridge/scripts/hooks.json').hooks
    };
};

exports.handle = function(hookID, hookEnabledCallback) {
    var HookMgr = require('dw/system/HookMgr');
    var hookEnabled = hookEnabledCallback(module.cartridge, hookID);
    if (hookEnabled && HookMgr.hasHook(hookID)) {
        var methodArgs = Array.prototype.slice.call(arguments, 2);
        methodArgs.unshift(
            hookID,
            hookID.slice(hookID.lastIndexOf('.')+1)
        );
        return HookMgr.callHook.apply(HookMgr, methodArgs);
    }
};
