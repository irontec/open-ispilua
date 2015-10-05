'use strict';

var Application = require('./application');

var config = require('./config');

var application = new Application(config);

application.start()
  .then(function() {
    application.startSchedule();
  })
  .catch(function(err) {
    console.log('ERROR starting server');
    console.log(err);
  });
