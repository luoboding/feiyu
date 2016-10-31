module.exports = function (ngModule) {
  ngModule.controller('MemberChoosePopupCtrl', function($modalData, ResponserService, $scope, $modalInstance) {
    var vm = this;
    try {
      vm.members = $modalData.members;
    } catch (e) {
      vm.members = [];
    }
    var memberId = [];
    for(var i = 0, length = vm.members.length; i < length; i++) {
      memberId.push(vm.members[i].id);
    }

    var init = function () {
      ResponserService.list({
        ispage: 0
      }).then(function (data) {
        vm.list = data.response.data.data;
        // console.log(memberId);
        for(var i = 0, length = vm.list.length; i < length; i++) {
          var item = vm.list[i];
          item.selected = memberId.indexOf(item.id) != -1;
        }
      });
    };

    _.extend(vm, {
      select: function(item) {
        if (memberId.indexOf(item.id) == -1) {
          memberId.push(item.id);
          vm.members.push(item);
        } else {
          memberId.splice(memberId.indexOf(item.id), 1);
          vm.members.splice(memberId.indexOf(item.id), 1);
        }
      },
      isSelected: function(id) {
        console.log('id', id);
        console.log('memberId.indexOf(id) != -1', memberId.indexOf(id) != -1);
        return memberId.indexOf(id) != -1;
      }
    });

    $scope.disabledEmpty = function() {
      return memberId.length > 0;
    };

    $scope.ok = function() {
      $modalInstance.close({
        memberId: memberId,
        members: vm.members
      });
    };

    init();
  });
};
