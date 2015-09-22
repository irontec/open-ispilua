'use strict';

function SeaWeather(resultForecast) {
    this.synopticalDescription = resultForecast.synopticalDescription[0];
    this.descriptions = {
        'es': resultForecast.forecastDescription[0].es[0],
        'eu': resultForecast.forecastDescription[0].eu[0]
    };
    this.waterTemperature = resultForecast.waterTemperature[0];
    this.windIcon = resultForecast.windIcon[0];
}

module.exports = SeaWeather;
