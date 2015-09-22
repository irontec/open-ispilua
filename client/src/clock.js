var openIspiluaClock = (function() {

    'use strict';

    function ClockController() {
        this.started = false;
    }

    ClockController.prototype = {
        setClockDOM: function() {
            var clockDOM = $('#openIspiluaClock');
            clockDOM.html('<div id="clock-content"></div>');
            this.startTime();
        },
        startTime: function() {
            if (!this.started) {
                this.updateTime();
            }
        },
        updateTime: function() {
            var today=new Date();
            var h=today.getHours();
            var m=today.getMinutes();
            var s=today.getSeconds();

            m = this.checkTime(m);
            s = this.checkTime(s);

            $('#clock-content').html(h+':'+m+':'+s);

            setTimeout(this.updateTime.bind(this),500);
        },
        checkTime: function(i) {
            if (i<10) {
                i = '0' + i; // add zero in front of numbers < 10
            }
            return i;
        }
    };

    return new ClockController();

})();
