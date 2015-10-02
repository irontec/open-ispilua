'use strict';

var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder('utf8');

var _ = require('underscore');
var Promisefyll = require('bluebird');

var Trip = require('./trips/model');

var application, config;

//var origin = 'santurtzi';

var directionsController = {
  getData: function() {
    if (this.trips) {
      return Promisefyll.resolve({ dataset: 'directions', directions: this.trips });
    }
    return Promisefyll.reject('Not found trips');
  },
  startRequestTimeout: function() {

    console.log('Fetching data from Google Maps Directions');
    this._getData()
    .then(this._generateResult)
    .then(this._storeData.bind(this))
    .catch(function(err) {
      console.log('Error fetching data from Google Maps Directions');
      console.log(err);
      setTimeout(function() {
        this.startRequestTimeout();
      }.bind(this), config.directions.timePerRequest * 60 * 1000);

    });

  },
  _storeData: function(trips) {
    this.trips = trips;
  },
  _generateResult: function(data) {

    var resultLines = [];

    _.each(data.routes, function(route) {

      _.each(route.legs, function(leg) {

        _.each(leg.steps, function(step) {

          if(step.transit_details) { // jshint ignore:line
            resultLines.push(step.transit_details); // jshint ignore:line
          }

        });

      });

    });

    var trips = [];
    _.each(resultLines, function(line) {
      var trip = new Trip(line);
      trips.push(trip);
    });

    return trips;

  },
  _getData: function() {

    var origin = application.locals.config.geo.lat + ',' + application.locals.config.geo.lon;
    return application.locals.api.getData(
        config.directions.url +
         '?origin=' + origin +
         '&destination=' + config.directions.destination +
         '&key=' + config.key +
         '&mode=' + config.directions.mode +
         '&alternatives=' + config.directions.alternatives,
        true,
        false
    )
    .then(this._decodeJSONData);

  },
  _decodeJSONData: function(data) {
    var bodyDecoded = decoder.write(data);
    var jsonData = JSON.parse(bodyDecoded);
    return jsonData;
  }

};

module.exports = function(app) {
    application = app;
    config = application.locals.config.googleapis;
    directionsController.startRequestTimeout();
    return directionsController;
};
