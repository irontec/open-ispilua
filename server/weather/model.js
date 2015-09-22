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

    this.icon = (resultForecast.symbol[0].symbolImage[0]).replace(
        '/contenidos/recurso_tecnico/tdtrtc/es_rtc/images/',''
    ).replace('.gif', '');
}

module.exports = Weather;
