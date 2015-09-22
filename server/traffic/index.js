'use strict';

var _ = require('underscore');
var jeyoDistans = require('jeyo-distans');

var application;

var Issue = require('./issues/model');

var trafficController = {

    getTrafficByGeo: function() {
        return this.getData()
        .then(
            this.filterByPosition.bind(this)
        );
    },
    filterByPosition: function(data) {
        var geo = application.locals.config.geo;

        var maxDistance = application.locals.config.opendata.traffic.maxDistance;
        var origin = [geo.lat, geo.lon];

        var issues = data.raiz.incidenciaGeolocalizada;
        var filteredIssues = [];

        _.each(issues, function(issue) {

                var destination = [ issue.latitud[0], issue.longitud[0] ];
                var distance = jeyoDistans( origin, destination );

                if (distance <= maxDistance) {
                    issue.distance = distance;
                    var issueModel = new Issue(issue);
                    filteredIssues.push(issueModel);
                }

        });

        return filteredIssues;

    },

    getData: function() {
        var api = application.locals.api;
        var url = application.locals.config.opendata.traffic.url;

        return api.getData(url, true);
    }

};

module.exports = function(app) {
    application = app;
    return trafficController;
};
