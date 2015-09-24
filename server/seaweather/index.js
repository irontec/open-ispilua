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
            if (todayForecast) {
                return new SeaWeather(todayForecast);
            }
            return null;
        });
    },


    getData: function() {
        var api = application.locals.api;
        return api.getData('seaWeather', false, false);
    },
    _getTodayForecastsFromToday: function(todayForecast) {
        if (todayForecast) {
            return _.find(todayForecast.forecasts[0].forecast, function(forecast) {
                return forecast.$.periodName === 'today';
            });
        }
        return todayForecast;
    },

    _getTodayForecastFromDataSet: function(dataSet) {
        var today = moment(),
            currentMonth = today.format('M'),
            currentDay = today.format('D');

        var forecastDay = this._getForecastsByPubDay(dataSet, currentMonth, currentDay);

        // Today there isn't new data, lets get past registers :S
        /*
        console.log('cuidado! nos vamos de while!');
        while(!forecastDay) {

            if (currentDay > 1) {
                currentDay = currentDay - 1;
            } else if (currentMonth > 1) {
                currentMonth = currentMonth - 1;
                currentDay = 31;
            } else {
                break;
            }

            forecastDay = this._getForecastsByPubDay(dataSet, currentMonth, currentDay);

        }
        console.log('hemos vuelto!');
        */
        return forecastDay;
    },

    _getForecastsByPubDay: function(dataset, month, day) {
        if (dataset) {
            return _.find(dataset.seaForecast.day, function(daySet) {
                console.log('current', month + '/' + day);
                console.log('daySet', daySet.$.month + '/' + daySet.$.day);
                return (month === daySet.$.month &&
                        day === daySet.$.day);
            });
        }
        return dataset;
    },

    _getZipContents: function(dataBuffer) {
        var zip = new AdmZip(dataBuffer);
        var zipEntries = zip.getEntries();
        if (zipEntries.length > 0) {
            var dataSet = zipEntries[0];
            var buffer = encoding.convert(dataSet.getData(), 'UTF-8', 'ISO-8859-1');
            var bodyDecoded = decoder.write(buffer);
            var cleanedDecoded = bodyDecoded.replace('\ufeff', '');
            var xml = xml2js.parseStringAsync(cleanedDecoded);
            return xml;
        }
        return;
    }

};

module.exports = function(app) {
    application = app;
    return seaWeatherController;
};
