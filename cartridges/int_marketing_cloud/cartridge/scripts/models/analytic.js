'use strict';

/**
 * @module models/analytic
 */

/**
 * @type {dw.system.HookMgr}
 */
const HookMgr = require('dw/system/HookMgr');
/**
 * @type {dw.io.StringWriter}
 */
const StringWriter = require('dw/io/StringWriter');
/**
 * @type {dw.template.Velocity}
 */
const velocity = require('dw/template/Velocity');

/**
 * Custom object name
 * @const {string}
 * @private
 */
const customObjectName = 'MarketingCloudAnalytics';
const helpers = require('../util/helpers');
const baseFolder = 'mcc';

var filters;
var mapFilter;
var callbacks;

/**
 * AnalyticEvent constructor
 * @param {string} analyticEventID
 * @constructor
 * @alias module:models/analytic~AnalyticEvent
 */
function AnalyticEvent(analyticEventID) {
    /**
     * The instance event ID
     * @type {string}
     */
    this.analyticEventID = analyticEventID;
    /**
     * Definition object
     * @type {dw.object.CustomAttributes}
     */
    this.definition = helpers.getCustomObject(customObjectName, analyticEventID) || {enabled: false};

    if (this.isEnabled()) {
        /**
         * @type {string}
         */
        this.customEventName = this.definition.customEventName;
        /**
         * Expanded attributes from trigger definition
         * @type {Object}
         */
        this.attributes = helpers.expandAttributes(this.definition.analyticAttributes);

        /**
         * Template filename
         * @type {string}
         */
        this.template = require('dw/util/StringUtils').format('{0}{1}{2}_{3}.vs', baseFolder, require('dw/io/File').SEPARATOR, customObjectName, analyticEventID);

        var hookID;
        if (empty(filters)) {
            hookID = 'app.objectMapper.filters';
            filters = HookMgr.callHook(
                hookID,
                hookID.slice(hookID.lastIndexOf('.') + 1)
            );
            // Fix for hook array return value being an List/ArrayList rather than a plain array...
            if (filters instanceof (require('dw/util/List'))) {
                filters = filters.toArray();
            }
        }

        if (empty(mapFilter)) {
            hookID = 'app.objectMapper.newMapFilter';
            mapFilter = HookMgr.callHook(
                hookID,
                hookID.slice(hookID.lastIndexOf('.') + 1),
                filters
            );
        }

        if (empty(callbacks)) {
            hookID = 'app.objectMapper.jsonCallbacks';
            callbacks = HookMgr.callHook(
                hookID,
                hookID.slice(hookID.lastIndexOf('.') + 1),
                function filter(config, key, value, data) {
                    return mapFilter.applyFilters(config, key, value, data);
                }
            );
        }

        this.mapFilter = mapFilter;
        this.callbacks = callbacks;
    }
}

/**
 * @alias module:models/analytic~AnalyticEvent#prototype
 */
AnalyticEvent.prototype = {
    /**
     * Render a Velocity template to string
     * @param {object} args
     * @returns {string}
     * @private
     */
    _renderTemplate: function _renderTemplate(args) {
        var jsonOut = new StringWriter();

        args.velocity = velocity;
        velocity.renderTemplate(this.template, args, jsonOut);

        return jsonOut.toString();
    },

    /**
     * Returns whether this trigger is enabled
     * @returns {boolean}
     */
    isEnabled: function isEnabled(){
        return this.definition.enabled === true;
    },

    /**
     * Return tracked event based on data mapping, or void if error occurred
     * @param {object} data Data object to be passed to the template
     * @returns {object|void}
     */
    trackEvent: function trackEvent(data){
        try {
            var jsonStr = this._renderTemplate({
                data: data,
                outputColumns: false,
                output: this.callbacks
            });

            try {
                return JSON.parse(jsonStr);
            } catch (e) {
                require('dw/system/Logger').error('Error parsing JSON: {0}', e);
            }
        }catch(e) {
            if (this.mapFilter && this.mapFilter.isRequiredException(e)) {
                // do nothing
            } else {
                require('dw/system/Logger').error('Error tracking event: {0}\nStacktrace: {1}', e.message, e.stack);
            }
        }
    }
};

module.exports = AnalyticEvent;
