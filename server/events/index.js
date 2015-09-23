'use strict';

var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder('utf8');
var encoding = require('encoding');

var _ = require('underscore');

var EventsModel = require('./model');

var application, config;



var eventsController = {
    getEvents: function() {
        return application.locals.api.getData(
            config.url + '&lang=' + config.language + '&max=' + config.limit,
            true,
            false
        )
        .then(this._decodeJSONData)
        .then(this._generateResultFromJSONArray);
    },
    _generateResultFromJSONArray: function(jsonData) {
        var result = [];
        _.each(jsonData.eventos, function(evento) {
            result.push(new EventsModel(evento));
        });
        return result;
    },
    _decodeJSONData: function(data) {
        var buffer = encoding.convert(data, 'UTF-8', 'ISO-8859-1');
        var bodyDecoded = decoder.write(buffer);
        var jsonData = JSON.parse(bodyDecoded);
        return jsonData;
    }
};

module.exports = function(app) {
    application = app;
    config = application.locals.config.opendata.events;
    return eventsController;
};
