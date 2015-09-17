'use strict';

var _ = require('underscore');

var application;

var weatherController = {

    getWeatherByCity: function(cityName) {
        var city = cityName || application.locals.config.opendata.weather.defaultCityName;
        return application.locals.api.getData('weather')
        .then(function(data) {
            var todayForecast = _.find(data.weatherForecast.forecasts[0].forecast, function(forecast) {
                    return forecast.$.forecastDay === 'today';
                });

                var resultForecast = _.find(todayForecast.cityForecastDataList[0].cityForecastData, function(cityForecast) {
                    return cityForecast.$.cityName === city;
                });

                var weather = {
                    'city': {
                        'code': resultForecast.$.cityCode,
                        'name': resultForecast.$.cityName,
                    },
                    'descriptions': {
                        'es': resultForecast.symbol[0].descriptions[0].es[0],
                        'eu': resultForecast.symbol[0].descriptions[0].eu[0]
                    },
                    'temp': {
                        'max': resultForecast.tempMax[0],
                        'min': resultForecast.tempMin[0],
                        'mid': ( parseInt(resultForecast.tempMax[0]) + parseInt(resultForecast.tempMin[0]) )/2
                    },
                    'icon': (resultForecast.symbol[0].symbolImage[0]).replace(
                                '/contenidos/recurso_tecnico/tdtrtc/es_rtc/images/',''
                            ).replace('.gif', '')
                };

                return weather;
        });
    }

};

module.exports = function(app) {
    application = app;
    return weatherController;
};
