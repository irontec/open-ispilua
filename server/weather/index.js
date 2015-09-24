'use strict';

var _ = require('underscore');

var application;

var Weather = require('./model');

var weatherController = {

    getWeatherByCity: function() {
        var self = this;

        return this.getData()
        .then(
            this._getTodayForecastFromData.bind(this)
        )
        .then(function(todayForecast) {

            var weatherConfig = application.locals.config.opendata.weather;
            var city = application.locals.config.geo.city || weatherConfig.defaultCityName;

            var cityForecast = self._getCityFromForecast(todayForecast, city);

            return new Weather(cityForecast);
        });
    },

    getData: function() {
        var api = application.locals.api;

        return api.getData('weather');
    },

    _getForecastsFromData: function(data) {
        return data.weatherForecast.forecasts[0].forecast;
    },
    _getTodayForecastFromData: function(data) {
        var forecasts = this._getForecastsFromData(data);
        return this._getTodayForecastFromArray(forecasts);

    },
    _getTodayForecastFromArray: function(forecasts) {
        return _.find(forecasts, function(forecast) {
            return forecast.$.forecastDay === 'today';
        });
    },
    _getCityFromForecast: function(forecast, city) {
        var forecastsItems = forecast.cityForecastDataList[0].cityForecastData;

        return _.find(forecastsItems, function(cityForecast) {
            return cityForecast.$.cityName === city;
        });
    }

};

module.exports = function(app) {
    application = app;
    return weatherController;
};
