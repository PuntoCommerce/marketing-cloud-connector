'use strict';

/**
 * @module feeds/orders
 */

/**
 * @type {dw/order/OrderMgr|dw.order.OrderMgr}
 */
const OrderMgr = require('dw/order/OrderMgr');

/**
 * @type {module:models/export~Export}
 */
const Export = require('../models/export');

/**
 * @type {module:models/export~Export}
 * @see https://help.marketingcloud.com/en/documentation/personalization_builder/personalization_builder_prerequisites/catalog/add_attributes/
 */
var exportModel;

function beforeStep(parameters, stepExecution) {
    exportModel = new Export(parameters, function(em){
        var d;
        // find orders modified within past year or since last run
        if (em.isIncremental && em.lastExported) {
            d = em.lastExported;
        } else {
            d = new Date();
            d.setFullYear( d.getFullYear() - 1 );
        }
        return OrderMgr.searchOrders('lastModified >= {0}', 'lastModified asc', d);
    });
    exportModel.writeHeader();
}

function getTotalCount(parameters, stepExecution) {
    return exportModel.seekableIterator.getCount();
}

function read(parameters, stepExecution) {
    if (exportModel.seekableIterator.hasNext()) {
        return exportModel.seekableIterator.next();
    }
}

/**
 * @param {dw/order/Order|dw.order.Order} order
 * @param parameters
 * @param stepExecution
 * @returns {void|Array}
 */
function process(order, parameters, stepExecution) {
    var skip = false;
    if (exportModel.isIncremental) {
        if (order.lastModified < exportModel.lastExported) {
            skip = true;
        }
    }
    if (!skip) {
        var data = {
            order: order
        };
        return exportModel.buildRow(data);
    }
}

function write(lines, parameters, stepExecution) {
    for (var i = 0; i < lines.size(); i++) {
        exportModel.writeRow(lines.get(i));
    }
}

function afterStep(success, parameters, stepExecution) {
    exportModel.close();
}

module.exports = {
    beforeStep: beforeStep,
    getTotalCount: getTotalCount,
    read: read,
    process: process,
    write: write,
    afterStep: afterStep
};