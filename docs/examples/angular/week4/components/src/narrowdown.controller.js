(function () {
'use strict';

angular.module('NarrowItDown')
.controller('NarrowItDownController', NarrowItDownController);

NarrowItDownController.$inject = ['$rootScope', 'MenuSearchService']
function NarrowItDownController($rootScope, service) {
	var self = this

	// data binding
	self.found = undefined
  self.title = ""

	// operations
  self.removeItem = function(idx) {
    self.found.splice(idx,1)
  }
	self.search = function(searchTerm) {
    self.found = undefined
    self.title = ""
    $rootScope.$broadcast("narrowdown:loading", true)
    if ((searchTerm === undefined) || (searchTerm.trim() === "")) {
      $rootScope.$broadcast("narrowdown:loading", false)
      self.title = "Please fill the search term correctly"
    } else {
      service.getMatchedMenuItems(searchTerm).then(
        function(result) {
          self.found = result
        },
        function(error) {
          self.title = "Nothing found"
          console.log(error)
        }).finally(function() {
          $rootScope.$broadcast("narrowdown:loading", false)
        })
    }
  }
}

})();