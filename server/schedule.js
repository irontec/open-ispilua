'use strict';

var later = require('later');
var _ = require('underscore');
var using = require('bluebird').using;

var getters = [];

var application;


var isWorking = false;

function getDataFromAPIS() {
    //events.getEvents();
    console.log('getting data');

    var usingGetters = [];
    _.each(getters, function(getter) {
        usingGetters.push(getter());
    });

    using(
      usingGetters,
      createReturnData
    ).then(function(data) {
        application.locals.io.sockets.emit('news', data);
        isWorking = false;
    })
    .catch(function(err) {
        console.log('ERROR!');
        console.log(err);
        isWorking = false;
    });
}

function createReturnData(dataArr) {
    var result = {
        layout: application.locals.config.layout,
        templates: application.locals.config.templates,
        datasets: {}
    };
    _.each(dataArr, function(data) {
        result.datasets[data.dataset] = data;
    });

    return result;
}

module.exports = function(app) {
    var text = app.locals.config.service.refreshInterval;
    application = app;

    _.each(app.locals.config.datasets, function(module) {
        if (module.enabled) {
            var mod = require('./' + module.moduleName)(app);
            getters.push(mod[module.getData].bind(mod));
        }
    });

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
