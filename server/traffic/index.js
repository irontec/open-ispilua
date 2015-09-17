'use strict';

var _ = require('underscore');
var jeyoDistans = require('jeyo-distans');

var application;

var trafficController = {

    getTrafficByGeo: function() {
        var cityName = cityName || 'Bilbao';
        var geo = application.locals.config.geo;
        var maxDistance = application.locals.config.opendata.traffic.maxDistance;

        return application.locals.api.getData(
            application.locals.config.opendata.traffic.url,
            true
        )
        .then(function(data) {
            var issues = data.raiz.incidenciaGeolocalizada;
            var filteredIssues = [];
            var origin = [geo.lat, geo.lon];
            _.each(issues, function(issue) {
                var destination = [ issue.latitud[0], issue.longitud[0] ];
                var distance = jeyoDistans( origin, destination );
                if (distance <= maxDistance) {
                    issue.distance = distance;
                    var issueModel = trafficController.generateTrafficIssueModel(issue);
                    filteredIssues.push(issueModel);
                }
            });
            return filteredIssues;
        });
    },

    generateTrafficIssueModel: function(issue) {
        return {
            distance: issue.distance,
            poblacion: issue.poblacion[0],
            autonomia: issue.autonomia[0],
            provincia: issue.provincia[0],
            carretera: issue.carretera[0],
            causa: issue.causa[0],
            fecha: issue.fechahora_ini[0],
            lat: issue.latitud[0],
            lon: issue.longitud[0],
            matricula: issue.matricula[0],
            nivel: issue.nivel[0],
            sentido: issue.sentido[0],
            tipo: issue.tipo[0]
        };
    }

};

module.exports = function(app) {
    application = app;
    return trafficController;
};
