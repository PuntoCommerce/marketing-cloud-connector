'use strict';

var customObjectName = 'MarketingCloudAuthToken';

/**
 * Retrieves cached token from custom object storage
 * If no existing token object, an empty one is created
 * @returns {dw/object/CustomAttributes} Returns token custom attributes
 */
function getCachedTokenObject() {
    var com = require('dw/object/CustomObjectMgr'),
        siteID = require('dw/system/Site').current.ID,
        curToken = com.getCustomObject(customObjectName, siteID);
    if (empty(curToken)) {
        require('dw/system/Transaction').wrap(function(){
            curToken = com.createCustomObject(customObjectName, siteID);
        });
    }
    return curToken.getCustom();
}

/**
 * Puts token into custom object storage
 * @param {Object} obj A plain JS object with the token
 * @returns {Object} Returns the same plain JS object
 */
function updateCachedTokenObject(obj) {
    var custObj = getCachedTokenObject();

    require('dw/system/Transaction').wrap(function(){
        custObj.token = JSON.stringify(obj);
    });

    return obj;
}

/**
 * Returns whether the stored token is valid
 * @returns {boolean} Whether the stored token is valid and not expired
 */
function isValidAuth() {
    var now = new Date();

    if(!this.token || !this.token.accessToken){
        var cachedToken = getCachedTokenObject();
        if (!cachedToken || !cachedToken.token) {
            return false;
        }
        this.token = JSON.parse(cachedToken.token);
    }

    return this.token && this.token.accessToken && this.token.expires > now.valueOf(); // check if expires is in the future
}

/**
 * Gets a valid token from storage or from a new auth request
 * @returns {boolean|Object} False or plain JS object containing the token response
 */
function getValidToken() {
    if(!this.isValidAuth()){
        var result = require('dw/svc/ServiceRegistry').get('marketingcloud.rest.auth').call();
        if (result.status == 'OK' && result.object) {
            this.token = updateCachedTokenObject(result.object);
        }
    }

    return this.isValidAuth() && this.token;
}

/**
 * Token class for checking auth and retrieving valid token
 * @constructor
 */
function authToken() {
    this.token = null;

    this.isValidAuth = function(){
        return isValidAuth.apply(this);
    };
    this.getValidToken = function(){
        return getValidToken.apply(this);
    };
}

module.exports = authToken;
