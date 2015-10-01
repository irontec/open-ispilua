'use strict';

var Application = require('./application');

var config = require('./config');

var application = new Application(config);

application.start();
