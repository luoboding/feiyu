"use strict";
module.exports = function(ngModule){
	ngModule.controller('PopupCaseViewCtrl', function(CaseService, $modalData) {
    var vm = this;
    var id = $modalData.id;
    console.log(id);
    CaseService.view(id).then(function(data) {
      vm.data = data.response.data.data;
    });
  });
};
