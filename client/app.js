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

            openIspiluaWeather.setWeather(data.weather);
            openIspiluaSeaWeather.setWeather(data.seaWeather);

            openIspiluaTraffic.setTrafficIssues(data.traffic.issues);

            openIspiluaNews.setNews(data.news);

            if (openIspiluaLayout.toRedraw) {
                openIspiluaClock.setClock();
                openIspiluaLayout.toRedraw = false;
            }
        }
    };

    var application = new OpenIspiluaApplication();
    return application;

});
