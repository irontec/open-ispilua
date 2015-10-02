'use strict';

var http = require('http');
var socketio = require('socket.io');
var express = require('express');
var promises = require('bluebird');
var request = promises.promisifyAll(require('request'));

var APIManager = require('./helpers/api');
var schedule = require('./schedule');

function Application(config) {
  this.config = config;
  this.initialize();
}

Application.GEO_LOCATION_URL = 'http://ip-api.com/json';

Application.prototype = {
  initialize: function() {
    this.app = this._promisify(express());
    this.server = this._promisify(http.Server(this.app));
    this.io = socketio(this.server);

    if (!this.config.opendata || !this.config.opendata.url) {
      throw 'Missing opendata config';
    }

    this.apiManager = new APIManager(this.config.opendata.url);

  },
  start: function() {
    this.app.locals.api = this.apiManager;
    this.app.locals.config = this.config;
    this.app.locals.clients = [];
    this.app.locals.io = this.io;

    return this._getGeolocation()
      .then(this.serve());
  },
  serve: function() {

    this.app.use('/static', express.static('../client'));

    this.io.on('connection', function (socket) {

        console.log('Client Connected');
        this.app.locals.clients.push(socket);

    }.bind(this));

    return this.server.listenAsync(this.config.service.port)
      .then(function() {

        console.log('Server started at ', this.config.service.port);

      }.bind(this));
  },
  startSchedule: function() {
    schedule.start(this.app);
  },
  _getGeolocation: function() {
    return request.getAsync(Application.GEO_LOCATION_URL)
      .then(function(response) {
        this.config.geo = JSON.parse(response[0].body);
        return this.config.geo;
      }.bind(this));
  },
  _promisify: function(obj) {
    return promises.promisifyAll(obj);
  }
};


module.exports = Application;
