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
    scope: {
      items: '<',
      title: '@',
      remove: '&onRemove',
    },
    controller: FoundItemsController,
    controllerAs: 'list',
    bindToController: true,
  };

  return ddo;
}

FoundItemsController.$inject = []
function FoundItemsController() {}

NarrowItDownAppController.$inject = ['MenuSearchService']
function NarrowItDownAppController(service) {
	var self = this

	// data binding
	self.found = []
  self.title = ""
	// operations
  self.removeItem = function(idx) {
    self.found.splice(idx,1)
    if (self.found.length == 0) {
      self.title = "List is empty again, try a new search!"
    } else {
      self.title = "Pick " + self.found.length + " items"
    }
  }
	self.getMatchedMenuItems = function(searchTerm) {
    if ((searchTerm === undefined) || (searchTerm.trim() === "")) {
      self.title = "Nothing found"
      self.found = []
    } else {
      service.getMatchedMenuItems(searchTerm).then(
        function(result) {
          self.title = "Pick " + result.length + " items"
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
      var filtered = []
      // process result and only keep items that match
      for (var i=0; i < menu_items.length; i++) {
        var item = menu_items[i]
        var itemName = item.description.toLowerCase()
        if (itemName.search(searchTerm) !== -1) {
          filtered.push(item);
        }
      }
      if (filtered.length == 0) {
        throw new Error("No results for '" + searchTerm + "'!")
      }
      return filtered;
    });
  };
}

})();