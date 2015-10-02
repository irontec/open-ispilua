'use strict';

function Line(data) {
  this.agencyName = data.agencies[0].name;
  this.name = data.name;
  this.shortName = data.short_name; // jshint ignore:line

  this.vehicle = {
    name: data.vehicle.name,
    type: data.vehicle.type
  };
}

function Trip(data) {

  this.arrival = data.arrival_time.text; // jshint ignore:line
  this.departure = data.departure_time.text; // jshint ignore:line
  this.title = data.headsign;
  this.line = new Line(data.line);

}



module.exports = Trip;
