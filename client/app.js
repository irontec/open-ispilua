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
            console.log('Data received', data);

            openIspiluaDrawer.draw(data);
        }
    };

    var application = new OpenIspiluaApplication();
    return application;

});
