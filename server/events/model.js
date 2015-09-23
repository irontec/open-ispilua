'use strict';

/* Fucking API uses snake case */
    /* jshint ignore:start */
function EventModel(data) {
    this.title = data['evento_titulo'];
    this.type = data['evento_tipo'];
}
module.exports = EventModel;
    /* jshint ignore:end */
