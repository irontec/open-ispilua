$(function() {

    'use strict';

    function OpenEstekaApplication() {
        this.socket = io.connect('http://localhost:9030');
        this.socket.on('connect', this.onConnect.bind(this));
        this.socket.on('news', this.onNews.bind(this));
        openEstekaClock.startTime();
    }

    OpenEstekaApplication.prototype = {
        onConnect: function() {
            console.log('Connected');
        },
        onNews: function(data) {
            openEstekaWeather.setWeather(data.weather);
            openEstekaTraffic.setTrafficIssues(data.traffic.issues);
            openEstekaNews.setNews(data.news);
        }
    };

    var application = new OpenEstekaApplication();
    return application;

});
