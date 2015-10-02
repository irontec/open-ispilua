'use strict';

module.exports = {
    'url': 'http://opendata.euskadi.eus/contenidos/',
    'traffic': {
        'url': 'http://www.trafikoa.net/servicios/IncidenciasTDT/IncidenciasTrafikoTDTGeo',
        'maxDistance': '10'
    },
    'weather': {
        'defaultCityName': 'Bilbao'
    },
    'news': {
        'url': 'http://www.euskadi.net/r01hSearchResultWar/r01hPresentationRSS.jsp?r01kLang=es&r01kQry=tC:euskadi;tT:nota_prensa,noticia;m:documentLanguage.EQ.es;p:Inter_portal,Inter;pp:r01NavBarBlockSize.10,r01PageSize.10',
        'limit': 3
    },
    'events': {
        'url': 'http://opendata.euskadi.eus/contenidos/ds_eventos/eventos_turisticos/opendata/agenda.json',
        //'language': 'es',
        'dayLimit': 7,
        'timePerRequest': 30
    }
};
