'use strict';

/* Fucking API uses snake case */
    /* jshint ignore:start */
function EventModel(data) {
    this.title = data.documentName;
    this.endDate = data.eventEndDate;
    this.startDate = data.eventStartDate;
}
module.exports = EventModel;
    /* jshint ignore:end */
