(function() {
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController)

ItemsController.$inject = ['data'];
function ItemsController(data) {
	var self = this
	self.list = data.menu_items
	self.category = data.category.name
}

})();