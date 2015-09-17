'use strict';

var request = require('request');
var Promise = require("bluebird");
Promise.promisifyAll(request);

var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder('utf8');
var encoding = require("encoding");

var xml2js = require('xml2js');

Promise.promisifyAll(xml2js);

var DATAMAP = {
    'weather': '/prevision_tiempo/met_forecast/opendata/met_forecast.xml'
};

function APIManager(url) {
    if (!this instanceof APIManager) {
        return new APIManager(url);
    }
    this.url = url;
}

APIManager.prototype = {
    getData: function(dataType, absolutePath) {
        if (!absolutePath) {
            dataType = this.url + DATAMAP[dataType];
        }
        return request
        .getAsync({
            url: dataType,
            encoding: null
        })
        .then(function(response, body) {
            var buffer = encoding.convert(response[0].body, 'UTF-8', 'ISO-8859-1');
            var bodyDecoded = decoder.write(buffer);
            return xml2js.parseStringAsync(bodyDecoded);
        });
    }
};

module.exports = APIManager;
