'use strict';

module.exports = [
    {
        moduleName: 'weather',
        getData: 'getWeatherByCity',
        enabled: true
    },
    {
        moduleName: 'seaweather',
        getData: 'getWeather',
        enabled: false
    },
    {
        moduleName: 'traffic',
        getData: 'getTrafficByGeo',
        enabled: true
    },
    {
        moduleName: 'news',
        getData: 'getNews',
        enabled: true
    },
    {
        moduleName: 'events',
        getData: 'getEvents',
        enabled: false
    }
];
