(function () {
'use strict';

angular.module('MenuSearch')
.service('MenuSearchService', MenuSearchService);

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