/*jshint -W079 */
/*jshint -W098 */
var openIspiluaSeaWeather = (function() {

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

    function SeaWeatherController() {
        this.weather = null;
    }

    SeaWeatherController.prototype = {
        setWeather: function(weather) {
            if ( !_.isEqual(this.weather, weather) ) {
                this.weather = weather;
                this.redraw();
            }
        },
        redraw: function() {
            var weatherDOM = $('#openIspiluaSeaWeather');

            var weatherHeader = '<div class="sea-weather-header-layout">' +
                                    '<div id="sea-weather-icon" ' +
                                        'data-webicon="meteocons:F">' +
                                    '</div>' +
                                    '<div class="sea-weather-title">' +
                                        'Prediccción Marítima' +
                                    '</div>' +
                                    '<div id="sea-weather-temperature">' +
                                        'Agua: ' + this.weather.waterTemperature + 'º C' +
                                    '</div>' +
                                '</div>';
            var weatherContent = '<div class="sea-weather-content-layout">' +
                                    '<div id="sea-weather-description">' +
                                        this.weather.descriptions.es +
                                    '</div>' +
                                 '</div>';

            weatherDOM.html(weatherHeader + weatherContent);

            $(document).webicons();
        }
    };


    return new SeaWeatherController();
})();
