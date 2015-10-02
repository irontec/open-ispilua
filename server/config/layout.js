'use strict';

/*
'displayTime': 8,
'displayOffset': 0,
'hideTime': 12
{
    'name': 'openIspiluaSeaWeather',
    'position': 'right',
    'displayTime': 8,
    'displayOffset': 10,
    'hideTime': 12
}
*/

module.exports = {
    'sections': [
        {
            'columns': [
                {
                    'colSize': '1_of_3',
                    'modules': [
                        {
                            'name': 'openIspiluaClock',
                            'position': 'left',
                            'displayOffset': 0,
                            'hideTime': 0
                        },
                        {
                            'name': 'openIspiluaEvents',
                            'position': 'left',
                            'displayOffset': 0,
                            'hideTime': 0
                        }
                    ]
                },
                {
                    'colSize': '1_of_3',
                    'modules': [
                      {
                          'name': 'openIspiluaNews',
                          'position': 'center'
                      }
                    ]
                },
                {
                    'colSize': '1_of_3',
                    'modules': [
                        {
                            'name': 'openIspiluaWeather',
                            'position': 'right'
                        },
                        {
                            'name': 'openIspiluaDirections',
                            'position': 'right'
                        }
                    ]
                }
            ]
        }
    ]
};
