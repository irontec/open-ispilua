$(function() {

    'use strict';

    function OpenIspiluaApplication() {
        this.socket = io.connect('http://localhost:9030');

        this.socket.on(
            'connect',
            this.onConnect.bind(this)
        );

        this.socket.on(
            'news',
            this.onNews.bind(this)
        );

        //openIspiluaClock.startTime();
    }

    OpenIspiluaApplication.prototype = {
        onConnect: function() {
            console.log('Connected');
        },
        onNews: function(data) {
            openIspiluaLayout.setLayout(data.layout);
            openIspiluaClock.setClockDOM();
            openIspiluaWeather.setWeatherDOM(data.weather);
            //openIspiluaWeather.setWeather(data.weather);
            openIspiluaTraffic.setTrafficIssuesDOM(data.traffic.issues);
            openIspiluaNews.setNewsDOM(data.news);
        }
    };

    var application = new OpenIspiluaApplication();
    return application;

});
