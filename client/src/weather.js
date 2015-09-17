var openEstekaWeather = (function() {

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
        setWeather: function(weather) {
            // Set values
            this.setWeatherIcon(weatherIconsMap[weather.icon]);
            this.setWeatherTitle(weather.city.name, weather.temp.mid);
            this.setWeatherDescription(weather.descriptions.es);
            // Reload icons
            $(document).webicons();
        },
        setWeatherIcon: function(weatherIcon) {
            $('#weather-icon').attr('data-webicon', 'meteocons:' + weatherIcon);
        },
        setWeatherTitle: function(cityName, temp) {
            $('#weather-city-name').text(temp + 'º en ' + cityName);
        },
        setWeatherDescription: function(description) {
            $('#weather-description').text(description);
        }
    };


    return new WeatherController();
})();
