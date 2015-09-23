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
    }

    OpenIspiluaApplication.prototype = {
        onConnect: function() {
            console.log('Connected');
        },
        onNews: function(data) {
            console.log('Data received');

            openIspiluaLayout.setLayout(data.layout);

            openIspiluaWeather.setWeather(
                data.weather,
                openIspiluaLayout.toRedraw
            );

            openIspiluaSeaWeather.setWeather(
                data.seaWeather,
                openIspiluaLayout.toRedraw
            );

            openIspiluaTraffic.setTrafficIssues(
                data.traffic.issues,
                openIspiluaLayout.toRedraw
            );

            openIspiluaNews.setNews(
                data.news,
                openIspiluaLayout.toRedraw
            );

            if (openIspiluaLayout.toRedraw) {
                openIspiluaClock.setClock();
                openIspiluaLayout.toRedraw = false;
            }
        }
    };

    var application = new OpenIspiluaApplication();
    return application;

});
