'use strict';

/**
 * @module feeds/catalog
 */

/**
 * @type {dw/catalog/ProductSearchModel|dw.catalog.ProductSearchModel}
 */
const ProductSearchModel = require('dw/catalog/ProductSearchModel');
/**
 * @type {dw/catalog/CatalogMgr|dw.catalog.CatalogMgr}
 */
const CatalogMgr = require('dw/catalog/CatalogMgr');

/**
 * @type {module:models/export~Export}
 */
const Export = require('../models/export');

/**
 * @type {module:models/export~Export}
 * @see https://help.marketingcloud.com/en/documentation/personalization_builder/personalization_builder_prerequisites/catalog/add_attributes/
 */
var exportModel;

/**
 * @type {dw/catalog/ProductSearchModel|dw.catalog.ProductSearchModel}
 */
var PSM;

function beforeStep(parameters, stepExecution) {
    exportModel = new Export(parameters, function(em){
        PSM = new ProductSearchModel();
        PSM.setCategoryID(CatalogMgr.siteCatalog.root.ID);
        PSM.setRecursiveCategorySearch(true);
        PSM.search();
        return PSM.getProducts();
    });
    exportModel.writeHeader();
}

function getTotalCount(parameters, stepExecution) {
    return PSM.getCount();
}

function read(parameters, stepExecution) {
    return exportModel.readNext();
}

function imageLink(cfg, data) {
    if (cfg.hasOwnProperty('imageType')) {
        var img = data.Product.getImage(cfg.imageType);
        if (img) {
            return img.absURL.https();
        }
    }
}

function standardPrice(cfg, data) {
    var Money = require('dw/value/Money');
    var stdPrice = Money.NOT_AVAILABLE;

    if (!empty(data.Product.priceModel)) {
        if (!data.Product.priceModel.price.available) {
            stdPrice = Money.NOT_AVAILABLE;
        } else {
            var priceBook = data.Product.priceModel.priceInfo.priceBook;

            while (priceBook.parentPriceBook) {
                priceBook = priceBook.parentPriceBook ? priceBook.parentPriceBook : priceBook;
            }

            stdPrice = data.Product.priceModel.getPriceBookPrice(priceBook.ID);
        }
    }

    return stdPrice.decimalValue;
}

/**
 * @param {dw/catalog/Product|dw.catalog.Product} product
 * @param parameters
 * @param stepExecution
 * @returns {void|Array}
 */
function process(product, parameters, stepExecution) {
    var skip = false;
    if (exportModel.isIncremental) {
        if (product.lastModified < exportModel.lastExported) {
            skip = true;
        }
    }
    // we're only interested in regular-ish products
    if (!product.isOnline() || product.isProductSet() || product.isBundle() || product.isVariant()) {
        skip = true;
    }
    if (!skip) {
        return function buildVariants(writeNextCB){
            var data;

            // output product
            data = buildProductData(product);
            writeNextCB(data);

            if (product.isMaster()) {
                // output variants
                var variants = product.getVariants();
                var variant;
                for (var indexPosition = 0, varLen = variants.length; indexPosition < varLen; indexPosition++) {
                    variant = variants[indexPosition];
                    if (exportModel.isIncremental) {
                        if (variant.lastModified < exportModel.lastExported) {
                            continue;
                        }
                    }
                    if (!variant.isOnline())
                        continue;
                    data = buildProductData(variant, product);
                    writeNextCB(data);
                }
            }
        };
    }
}

/**
 * @param {dw/catalog/Product|dw.catalog.Product|dw/catalog/Variant|dw.catalog.Variant} product
 * @param {dw/catalog/Product|dw.catalog.Product} masterProduct
 * @returns {Array<String>}
 */
function buildProductData(product, masterProduct) {
    var data = {
        Product: product,
        ProductLink: require('dw/web/URLUtils').abs('Product-Show', 'pid', product.ID).https(),
        ImageLink: imageLink,
        StandardPrice: standardPrice
    };
    if (!empty(masterProduct)) {
        data._aliases = { // fallback mappings for when the default doesn't return a valid value
            Product: masterProduct
        };
    }
    return exportModel.buildRow();
}

function write(lines, parameters, stepExecution) {
    var row;
    for (var i = 0; i < lines.length; i++) {
        row = lines.get(i);
        if (typeof(row) === 'function') {
            row(function writeRow(data){
                exportModel.writeRow(data);
            });
        } else {
            exportModel.writeRow(row);
        }
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