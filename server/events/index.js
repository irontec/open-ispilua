'use strict';

var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder('utf8');

var _ = require('underscore');
var moment = require('moment');
moment.locale('es');

var Promisefyll = require('bluebird');

var EventsModel = require('./model');



var application, config;



var eventsController = {
    getEvents: function() {
      if (this.events) {
        return Promisefyll.resolve({ dataset: 'events', events: this.events });
      }
      return Promisefyll.reject('Not found events');

    },
    startRequestTimeout: function() {

      console.log('Fetching data from Opendata Events Api');

      this._getEvents()
        .then(this._generateResultFromJSONArray)
        .then(this._storeData.bind(this))
        .catch(function(err) {
          console.log('Error fetching data Opendata Events Api');
          console.log(err);
          setTimeout(function() {
            this.startRequestTimeout();
          }.bind(this), config.timePerRequest * 60 * 1000);

        });

    },
    _storeData: function(events) {
      this.events = events;
    },
    _getEvents: function() {
      return application.locals.api.getData(
          config.url,
          true,
          false
      )
      .then(this._decodeJSONData);
    },
    _generateResultFromJSONArray: function(jsonData) {
        var events = [];
        _.each(jsonData, function(evento) {
          if (evento.eventEndDate) {

            var eventEnd = moment( evento.eventEndDate, 'D/M/YYYY' );

            if ( eventEnd.isAfter(new Date(), 'day') ||
                  eventEnd.isSame(new Date(), 'day')
            ) {
              if ( moment().add(config.dayLimit, 'days').isAfter( eventEnd, 'day') ||
                    moment().add(config.dayLimit, 'days').isSame( eventEnd, 'day')
              ) {
                events.push(new EventsModel(evento));
              }
            }

          }

        });
        return events;
    },
    _decodeJSONData: function(data) {
        var bodyDecoded = decoder.write(data);
        var jsonData = JSON.parse(bodyDecoded);
        return jsonData;
    }
};

module.exports = function(app) {
    application = app;
    config = application.locals.config.opendata.events;
    eventsController.startRequestTimeout();
    return eventsController;
};
