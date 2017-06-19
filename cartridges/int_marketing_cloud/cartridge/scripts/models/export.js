'use strict';

/**
 * @module models/export
 */

/**
 * @type {dw/io/File|dw.io.File}
 */
const File = require('dw/io/File');
/**
 * @type {dw/io/FileWriter|dw.io.FileWriter}
 */
const FileWriter = require('dw/io/FileWriter');
/**
 * @type {dw/io/CSVStreamWriter|dw.io.CSVStreamWriter}
 */
const CSVStreamWriter = require('dw/io/CSVStreamWriter');

/**
 * @constructor
 * @param {object} params
 * @param {Function} seekableCallback
 * @alias module:models/export~Export
 */
function Export(params, seekableCallback) {
    /**
     * @type {module:models/dataExport~DataExport}
     * @private
     */
    this._model = require('int_marketing_cloud').dataExport(params.ExportID);
    /**
     * @type {dw/io/File|dw.io.File}
     * @private
     */
    var siteID = require('dw/system/Site').current.ID;
    var dirName = File.IMPEX + File.SEPARATOR + 'mccfeeds' + File.SEPARATOR + siteID;
    // ensure dirpath exists
    (new File(dirName)).mkdirs();
    this._file = new File(dirName + File.SEPARATOR + params.ExportFileName);
    /**
     * @type {dw/io/FileWriter|dw.io.FileWriter}
     * @private
     */
    this._fileWriter = new FileWriter(this._file);
    /**
     * @type {dw/io/CSVStreamWriter|dw.io.CSVStreamWriter}
     * @private
     */
    this._csvWriter = new CSVStreamWriter(this._fileWriter, params.Delimiter === 'TAB' ? '\t' : params.Delimiter);
    /**
     * @type {boolean}
     */
    this.isIncremental = params.IncrementalExport;
    /**
     * @type {Date}
     */
    this.lastExported = this._model.lastExportStatus.lastExported;
    /**
     * @type {Array}
     */
    this.header = this._model.header;
    /**
     * @type {dw/util/SeekableIterator|dw.util.SeekableIterator}
     */
    this.seekableIterator = seekableCallback(this);
}

Export.prototype = {
    writeHeader: function writeHeader() {
        this._csvWriter.writeNext(this.header);
    },

    /**
     * Translates object into an array of mapped values
     * @param {Object} data
     * @returns {Array<String>}
     */
    buildRow: function buildRow(data) {
        return this._model.buildRow(data);
    },

    /**
     * Writes array of data to file
     * @param {dw/util/ArrayList|dw.util.ArrayList} data
     */
    writeRow: function writeRow(data) {
        // interestingly, DW logic apparently converts native array to ArrayList...
        this._csvWriter.writeNext(data.toArray());
    },

    close: function close() {
        this._csvWriter.close();
        this._fileWriter.close();
        this.seekableIterator.close();
        this._model.markExported();
    }
};

module.exports = Export;