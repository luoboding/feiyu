module.exports = function(ngModule) {
  ngModule.controller('RenovationViewCtrl', function(renovation, ModalService) {
    console.log('renovation', renovation);
    var vm = this;
    vm.renovation = renovation;
  });
};
