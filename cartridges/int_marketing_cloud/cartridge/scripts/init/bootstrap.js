'use strict';

// @TODO: Consider moving away from INIT approach, and using on-hook-demand or job-based init

function hookFilter(hook) {
    var match = 'app.communication.';
    var exclude = match +'handler.';
    return hook.name.slice(0, match.length) === match &&
        hook.name.slice(0, exclude.length) !== exclude;
}

function initTriggers() {
    var triggerModel = require(module.cartridge).trigger;
    var hooks = require('~/cartridge/scripts/hooks.json').hooks.filter(hookFilter);
    hooks.forEach(function(hook){
        var trigger = triggerModel(hook.name);
        trigger.rebuild();
    });
}

initTriggers();
