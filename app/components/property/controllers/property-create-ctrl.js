"use strict";
module.exports = function(ngModule){
	ngModule.controller('PropertyCreateCtrl', function(PropertyService, AppConfig, ModalService, $filter, Loader, parents, $stateParams, $state) {
		var vm  = this;
		vm.property = {};
		parents.unshift({
			id: 0,
			name: '顶级'
		});
		vm.parents = parents;
		console.log('parents', parents);
		_.extend(vm, {
			create: function() {
				Loader.show();
				PropertyService.create(vm.property).then(function() {
					Loader.hide();
					$state.go('app.property.list');
				}, function(error) {
					Loader.hide();
					vm.error = error.response.error;
				});
      },
			types: $filter('PropertyTypeFilter').searchOptions
		});
	});
};
