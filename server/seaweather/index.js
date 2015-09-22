'use strict';

var _ = require('underscore');
var AdmZip = require('adm-zip');

var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder('utf8');
var encoding = require('encoding');
var xml2js = require('xml2js');

var moment = require('moment');

var application;

var SeaWeather = require('./model');

var seaWeatherController = {

    getWeather: function() {

        return this.getData()
        .then(
            this._getZipContents.bind(this)
        )
        .then(
            this._getTodayForecastFromDataSet.bind(this)
        )
        .then(
            this._getTodayForecastsFromToday.bind(this)
        )
        .then(function(todayForecast) {
            return new SeaWeather(todayForecast);
        });
    },


    getData: function() {
        var api = application.locals.api;

        return api.getData('seaWeather', false, false);
    },

    _getTodayForecastsFromToday: function(todayForecast) {
        return _.find(todayForecast.forecasts[0].forecast, function(forecast) {
            return forecast.$.periodName === 'today';
        });
    },

    _getTodayForecastFromDataSet: function(dataSet) {
        return _.find(dataSet.seaForecast.day, function(daySet) {
            var today = moment();
            return (
                today.format('M') === daySet.$.month &&
                today.format('D') === daySet.$.day
            );
        });
    },

    _getZipContents: function(dataBuffer) {
        var zip = new AdmZip(dataBuffer);
        var zipEntries = zip.getEntries();

        if (zipEntries.length > 0) {
            var dataSet = zipEntries[0];
            var buffer = encoding.convert(dataSet.getData(), 'UTF-8', 'ISO-8859-1');
            var bodyDecoded = decoder.write(buffer);
            return xml2js.parseStringAsync(bodyDecoded);
        }
        return;
    }

};

module.exports = function(app) {
    application = app;
    return seaWeatherController;
};
