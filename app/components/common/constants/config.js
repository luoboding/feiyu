'use strict';
module.exports = function(ngModule) {
    ngModule.constant('AppConfig', {
        PAGER: {
            page: 1,
            total: 20,
            size: 10,
            max: 5
        },
        gameTypes: ['NBA', 'EPL', 'MLB'],
        platforms: ['pc', 'ios', 'android'],
        prize_types: [
            {value: 1901, label: "无奖金"},
            {value: 1902, label: "冠军获奖"},
            {value: 1903, label: "前三获奖"},
            {value: 1904, label: "半数获奖"},
        ]
    });
};
