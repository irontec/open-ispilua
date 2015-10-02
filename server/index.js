'use strict';

var Application = require('./application');

var config = require('./config');

var application = new Application(config);


// ========================== THIS IS TESTING YEAH! ================================
/*
var directions = require('./directions');

application.start()
  .then(function() {
    var mod = directions(application.app);
    setTimeout(function() {
      mod.getData()
      .then(function(data) {
        console.log(data);
      });

    }, 3000);
  });
*/
// ==================================================================================


application.start()
  .then(function() {
    application.startSchedule();
  })
  .catch(function(err) {
    console.log('ERROR starting server');
    console.log(err);
  });
