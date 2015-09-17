$(function() {

'use strict';

// Initialize webicon
/*
$(document).webicons({
    svgSet: {
      "flat-color-icons": '//cdn.rawgit.com/icons8/flat-color-icons/v1.0.2/icon-set/icons.svg'
    },
    alias: {
      fci: 'flat-color-icons'
    },
    icon: {
      clock: '//cdn.rawgit.com/icons8/flat-color-icons/v1.0.2/svg/clock.svg'
    }
});
*/

var weatherIconsMap = {
    '01': 'H',
    '02': 'H',
    '03': 'H',
    '04': 'N',
    '05': 'N',
    '06': 'Y',
    '07': 'J',
    '08': 'M',
    '09': 'M',
    '10': 'Q',
    '11': 'Q',
    '12': 'R',
    '13': 'R',
    '14': 'P',
    '15': 'Z'
};

function connect() {
    var socket = io.connect('http://localhost:9030');
    socket.on('connect', onConnect);
    socket.on('news', onNews);
}

function onConnect() {
    console.log('Connected');
}

function onNews(data) {
    setWeather(data.weather);
    setTrafficIssues(data.traffic.issues);
}

function setWeather(weather) {

    $('#weather-icon').attr('data-webicon', 'meteocons:' + weatherIconsMap[weather.icon]);

    $('#weather-city-name').text(weather.temp.mid + 'º en ' + weather.city.name);

    $('#weather-description').text(weather.descriptions.es);

     $(document).webicons();
}

function setTrafficIssues(issues) {
    var htmlContent = '';

    $.each(issues, function(index, issue){
        // autonomia: "Euskadi"
        // carretera: "BI-2701"
        // causa: "Obras"
        // distance: "19.455"
        // fecha: "2015-09-17 09:29:39"
        // lat: "43.22881"
        // lon: "-3.16094"
        // matricula: "BI"
        // nivel: "Blanco"
        // poblacion: "Sopuerta"
        // provincia: "BIZKAIA"
        // sentido: "MALABRIGO"
        // tipo: "Obras"
        if (!issue.carretera || !issue.poblacion || !issue.causa || !issue.nivel) return;
        var issueTitle = 'Incidencia en la ' +  issue.carretera + ' (' + issue.poblacion + ')';
        var issueCause = 'Causa: ' + issue.causa;
        var issueLevel = 'Nivel: ' + issue.nivel;
        var htmlItem = '<li class="traffic-issues-item">' +
                            '<p class="traffic-issues-item-title">' +
                                issueTitle +
                            '</p>' +
                            '<p class="traffic-issues-item-cause">' +
                                issueCause +
                            '</p>' +
                            '<p class="traffic-issues-item-level">' +
                                issueLevel +
                            '</p>' +
                        '</li>';
        htmlContent += htmlItem;
    });
    $('#traffic-issues-list').html(htmlContent);

    console.log(issues);
}

function startTime() {
    var today=new Date();
    var h=today.getHours();
    var m=today.getMinutes();
    var s=today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    $('#clock-content').html(h+':'+m+':'+s);
    setTimeout(function(){startTime();},500);
}

function checkTime(i) {
    if (i<10) {
        i = '0' + i; // add zero in front of numbers < 10
    }
    return i;
}

connect();
startTime();



});
