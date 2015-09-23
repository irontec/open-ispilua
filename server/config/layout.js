'use strict';

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
                            'name': 'openIspiluaTraffic',
                            'position': 'left',
                            'displayTime': 8,
                            'displayOffset': 0,
                            'hideTime': 12
                        },
                        {
                            'name': 'openIspiluaNews',
                            'position': 'left',
                            'displayTime': 8,
                            'displayOffset': 10,
                            'hideTime': 12
                        }
                    ]
                },
                {
                    'colSize': '1_of_3',
                    'modules': []
                },
                {
                    'colSize': '1_of_3',
                    'modules': [
                        {
                            'name': 'openIspiluaWeather',
                            'position': 'right'
                        },
                        {
                            'name': 'openIspiluaSeaWeather',
                            'position': 'right',
                            'displayTime': 8,
                            'displayOffset': 10,
                            'hideTime': 12
                        }
                    ]
                }
            ]
        }
    ]
};
