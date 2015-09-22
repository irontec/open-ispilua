'use strict';

var request = require('request');
var promiseManager = require('bluebird');
promiseManager.promisifyAll(request);

var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder('utf8');
var encoding = require('encoding');

var xml2js = require('xml2js');

promiseManager.promisifyAll(xml2js);

var DATAMAP = {
    'weather': '/prevision_tiempo/met_forecast/opendata/met_forecast.xml'
};

function APIManager(url) {
    var isInstanceofAPIManager = (this instanceof APIManager);
    if ( !isInstanceofAPIManager ) {
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
        .then(function(response) {
            var buffer = encoding.convert(response[0].body, 'UTF-8', 'ISO-8859-1');
            var bodyDecoded = decoder.write(buffer);
            return xml2js.parseStringAsync(bodyDecoded);
        });
    }
};

module.exports = APIManager;
