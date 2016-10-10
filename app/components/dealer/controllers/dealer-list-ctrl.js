"use strict";
module.exports = function(ngModule){
	ngModule.controller('DealerListCtrl', function(ModalService) {
		var vm = this;
		_.extend(vm, {
			viewDealer: function() {
				ModalService.show({
                    title: '注意事项',
                    okButtonLabel: '保存',
                    cancelButtonLabel: "取消",
                    cancelCls: 'btn btn-lg btn-primary',
                    okCls: 'btn btn-lg btn-primary',
                    html: require('./../templates/partials/edit-dealer.jade'),
                    controller: function($scope) {
                    }
                }).then(function () {
                    if(data.id) {
                        Exchange.updateNotices(data);
                    } else {
                        Exchange.createNotices(data);
                    }
                });
			}
		})
	});
};