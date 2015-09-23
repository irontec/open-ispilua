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

function Weather(resultForecast) {

    this.city = {
        'code': resultForecast.$.cityCode,
        'name': resultForecast.$.cityName,
    };

    this.descriptions = {
        'es': resultForecast.symbol[0].descriptions[0].es[0],
        'eu': resultForecast.symbol[0].descriptions[0].eu[0]
    };

    this.temp = {
        'max': resultForecast.tempMax[0],
        'min': resultForecast.tempMin[0],
        'mid': ( parseInt(resultForecast.tempMax[0]) + parseInt(resultForecast.tempMin[0]) )/2
    };

    var iconMapIdentifier = (resultForecast.symbol[0].symbolImage[0]).replace(
        '/contenidos/recurso_tecnico/tdtrtc/es_rtc/images/',''
    ).replace('.gif', '');

    this.icon = weatherIconsMap[iconMapIdentifier];
}

module.exports = Weather;
