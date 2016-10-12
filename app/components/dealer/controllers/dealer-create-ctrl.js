"use strict";
module.exports = function(ngModule){
	ngModule.controller('DealerCreateCtrl', function(ModalService, DealerService, AppConfig, $filter) {
		var vm = this;
    _.extend(vm, {
      create: function() {
        DealerService.create(vm.data).then(function() {
          
        }, function() {

        });
      }
    });
  });
};
