'use strict';

var promisesManager = require('bluebird');

var APIManager = require('./helpers/api');
var request = require('request');
promisesManager.promisifyAll(request);

var config = require('./config');

var express = require('express');
var app = express();
promisesManager.promisifyAll(app);


var config = require('./config');
config.templates = require('./config/templates');

var apiManager = new APIManager(config.opendata.url);


var server = require('http').Server(app);
promisesManager.promisifyAll(server);
var io = require('socket.io')(server);

getGeo()
.then(function() {
    startServer();
})
.catch(function(e) {
    console.log('Error', e);
    throw e;
});

function getGeo() {
    return request.getAsync('http://ip-api.com/json')
    .then(function(response) {
        config.geo = JSON.parse(response[0].body);
        return config.geo;
    });
}

function startServer() {
    app.locals.api = apiManager;
    app.locals.config = config;
    app.locals.clients = [];

    require('./schedule')(app);

    // Serve Client app
    app.use('/static', express.static('../client'));

    io.on('connection', function (socket) {
        console.log('Connected');
        app.locals.clients.push(socket);
    });


    server.listenAsync(config.api.port)
    .then(function() {
        console.log('SUCCESS', config);
    })
    .catch(function(err) {
        console.log('ERROR');
        console.log(err);
    });

}




