'use strict';

module.exports = {
    'common': {
        'section': '<div class="section group">{{:content}}</div>',
        'column': '<div class="col span_{{:colSize}}">{{:content}}</div>',
        'module': '<div class="module-layout {{:name}}-layout {{:position}}-layout " ' +
                        'id="{{:name}}" style="display: none">' +
                        '<div class="module-header"></div>' +
                        '<div class="module-content"></div>' +
                  '</div>'
    },
    'modules': [
        {
            'name': 'openIspiluaClock',
            'custom': true
        },
        {
            'name': 'openIspiluaWeather',
            'dataset': 'weather',
            'template': {
                'header': '<h1>' +
                            '{{:temp.min}} - {{:temp.max}}ºC' +
                            ' en {{:city.name}}' +
                          '</h1>' +
                          '<webicon icon="meteocons:{{:icon}}" class="i1"/>',
                'content': '<p class="p1">{{:descriptions.es}}</p>'
            }
        },
        {
            'name': 'openIspiluaSeaWeather',
            'dataset': 'seaWeather',
            'template': {
                'header': '<h1>' +
                            '<webicon icon="meteocons:F" class="i2"/>' +
                            ' Prediccción Marítima' +
                          '</h1>' +
                          '<h2>Agua: {{:waterTemperature}}</h2>',
                'content': '<p class="p1">{{:descriptions.es}}</p>'
            }
        },
        {
          'name': 'openIspiluaNews',
          'options': {
            'type': 'slider',
            'config': {
              'adaptiveHeight': false,
              'captions': false,
              'pager': false,
              'controls': false,
              'transition': 'horizontal', // fade, horizontal, kenburns, false
              'speed': 1200,
              'pause': 3000
            }
          },
          'dataset': 'news',
          'template': {
            'header': '<h1>' +
                        '<webicon icon="material:subject" class="i2"/>' +
                        ' Noticias de última hora' +
                      '</h1>',
            'content': '<ul id="openIspiluaNewsSlider">' +
                          '{{for news}}' +
                            '<li style="height:200px"><h2>{{:title}}</h2></li>' +
                          '{{/for}}' +
                      '</ul>'
          }
        },
        {
            'name': 'openIspiluaTraffic',
            'dataset': 'traffic',
            'template': {
                'header': '<h1>' +
                            '<webicon icon="material:directions-car" class="i2"/>' +
                            ' Incidencias de tráfico ({{:issues.length}})' +
                          '</h1>',
                'content': '<ul>' +
                                '{{for issues}}' +
                                    '<li>' +
                                        '<h2>Incidencia en la {{:carretera}}</h2>' +
                                        '<p class="p1">Causa: {{:causa}}</p>' +
                                        '<p class="p2">Nivel: {{:nivel}}</p>' +
                                    '</li>' +
                                '{{/for}}' +
                            '</ul>'
            }
        }
    ]
};
