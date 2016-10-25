"use strict";
module.exports = function(ngModule){
	ngModule.controller('PropertyEditCtrl', function(PropertyService, AppConfig, ModalService, $filter, Loader, $stateParams, $state, property, parents) {
		var vm  = this;
		parents.unshift({
			id: '0',
			name: '顶级'
		});
		vm.parents = parents;
		vm.property = property;
		_.extend(vm, {
			edit: function() {
				Loader.show();
				PropertyService.update($stateParams.id, vm.property).then(function() {
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
