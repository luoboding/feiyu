"use strict";
module.exports = function(ngModule){
	ngModule.controller('PropertyCreateCtrl', function(PropertyService, AppConfig, ModalService, $filter, Loader, parents, $stateParams, $state) {
		var vm  = this;
		vm.property = {};
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
			types: $filter('PropertyTypeFilter').searchOptions,
			typeChanged: function() {
				console.log('vm.property.type', vm.property.type);
				console.log("vm.parent", parents);
				vm.parents = [{
					id: 0,
					name: '顶级'
				}];
				for(var i = 0, length = parents.length; i < length; i++) {
					if (parents[i].type == vm.property.type) {
						vm.parents.push(parents[i]);
					}
				}
			}
		});
	});
};
