'use strict';
module.exports = function (ngModel) {
    ngModel.service('Nav', function (HttpResource, $http) {
        return {
            getStatisticsMenu: function () {
                return [
                    {text: '账户活跃', url: 'app.statistic.account'},
                    {text: '用户留存', url: 'app.statistic.user'},
                    {text: '充值消费', url: 'app.statistic.recharge'},
                    {text: '竞赛参与', url: 'app.statistic.contest'}
                ];
            },
            getExchangeMenu: function () {
                return [
                    {text: '订单处理', url: 'app.exchange.order'},
                    {text: '目录管理', url: 'app.exchange.catalog'},
                    {text: '兑换配置', url: 'app.exchange.commodity'},
                    {text: '充值配置', url: 'app.exchange.recharge'}
                ];
            },
            getExchangeNum: function() {
                return HttpResource.deferWrap($http.get(global.ENV.remoteHost + 'productOrders/untreated'));
            }
        };
    });
};
