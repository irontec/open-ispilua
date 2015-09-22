'use strict';

var later = require('later');
var _ = require('underscore');
var using = require('bluebird').using;

var weatherModule = require('./weather');
var trafficModule = require('./traffic');
var newsModule = require('./news');

var application;
var weather, traffic, news;


var isWorking = false;

function getDataFromAPIS() {
    using(

      weather.getWeatherByCity(application.locals.config.geo.city),

      traffic.getTrafficByGeo(),

      news.getNews(),

      function(weather, traffic, news) {
        var returnData = {
            weather: weather,
            traffic: {
                issues: traffic
            },
            news: news
        };
        return returnData;
      }
    ).then(function(data) {
        sendDataToClients(data);
    });

    /*
    return weather.getWeatherByCity(application.locals.config.geo.city)
    .then(function(data) {
        console.log(data);
    })
    .catch(function(err) {
        throw err;
    });
    */
}

function sendDataToClients(data) {
    _.each(application.locals.clients, function(client) {
        client.emit('news', data);
    });
    isWorking = false;
}

module.exports = function(app) {
    var text = 'every 5 seconds';
    application = app;

    weather = weatherModule(app);
    traffic = trafficModule(app);
    news = newsModule(app);

    var schedule = later.parse.text(text);

    later.setInterval(function() {
        console.log('Running sync loop');
        if (isWorking) {
            return;
        }
        isWorking = true;
        getDataFromAPIS();

    }, schedule);

    getDataFromAPIS();


};
