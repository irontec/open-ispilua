var openIspiluaWeather = (function() {

    'use strict';

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

    function WeatherController() {}

    WeatherController.prototype = {
        setWeatherDOM: function(weather) {
            var weatherDOM = $('#openIspiluaWeather');

            var weatherHeader = '<div class="weather-header-layout">' +
                                    '<div id="weather-city-name">' +
                                        weather.temp.mid + 'º en ' + weather.city.name +
                                    '</div>' +
                                    '<div id="weather-icon" ' +
                                        'data-webicon="meteocons:' +
                                            weatherIconsMap[weather.icon] +
                                        '">' +
                                    '</div>' +
                                '</div>';
            var weatherContent = '<div class="weather-content-layout">' +
                                    '<div id="weather-description">' +
                                        weather.descriptions.es +
                                    '</div>' +
                                 '</div>';

            weatherDOM.html(weatherHeader + weatherContent);

            $(document).webicons();
        }
    };


    return new WeatherController();
})();
