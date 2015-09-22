'use strict';

function Issue(data) {
    this.distance = data.distance;
    this.poblacion = data.poblacion[0];
    this.autonomia = data.autonomia[0];
    this.provincia = data.provincia[0];
    this.carretera = data.carretera[0];
    this.causa = data.causa[0];
    /* Fucking XML API uses snake case */
    /* jshint ignore:start */
    this.fecha = data.fechahora_ini[0];
    /* jshint ignore:end */
    this.lat = data.latitud[0];
    this.lon = data.longitud[0];
    this.matricula = data.matricula[0];
    this.nivel = data.nivel[0];
    this.sentido = data.sentido[0];
    this.tipo = data.tipo[0];
}

module.exports = Issue;
