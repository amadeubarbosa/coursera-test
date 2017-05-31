(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownAppController', NarrowItDownAppController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItems)
.constant('ITEMS_URL', 'https://davids-restaurant.herokuapp.com/menu_items.json');

function FoundItems() {
  var ddo = {
    templateUrl: 'items-template.html',
  };

  return ddo;
}

NarrowItDownAppController.$inject = ['MenuSearchService']
function NarrowItDownAppController(service) {
	var self = this

	// data binding
	self.found = []
	// operations
  self.remove = function(idx) {
    self.found.splice(idx,1)
  }
	self.getMatchedMenuItems = function(searchTerm) {
    if (searchTerm.trim() === "") {
      self.title = "Nothing found"
      self.found = []
    } else {
      service.getMatchedMenuItems(searchTerm).then(
        function(result) {
          self.title = "We found something!"
          self.found = result
        },
        function(error) {
          self.title = "Nothing found"
          console.log(error)
          self.found = []
        })
    }
  }
}

MenuSearchService.$inject = ['$http', 'ITEMS_URL'];
function MenuSearchService ($http, ITEMS_URL){
  var service = this

  service.getMatchedMenuItems = function (searchTerm) {
    var searchTerm = searchTerm.toLowerCase()
    return $http({
      method: "GET",
      url: ITEMS_URL
    }).then(function (result) {
      var menu_items = result.data.menu_items
      var found = []
      // process result and only keep items that match
      for (var i=0; i < menu_items.length; i++) {
        var item = menu_items[i]
        var itemName = item.description.toLowerCase()
        if (itemName.search(searchTerm) !== -1) {
          found.push(item);
        }
      }
      if (found.length == 0) {
        throw new Error("No results for '" + searchTerm + "'!")
      }
      return found;
    });
  };
}

})();