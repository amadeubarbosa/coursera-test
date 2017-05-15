(function () {
'use strict';

angular.module('ShoppingListApp', [])
.controller('UnlimitedController', UnlimitedController)
.controller('LimitedController', LimitedController)
.factory('ShoppingListFactory', Factory);

function Factory() {
  return function(limit) {
    return new ShoppingListService(limit)
  }
}

UnlimitedController.$inject = ['ShoppingListFactory'];
function UnlimitedController(ShoppingListFactory) {
  var controller = this

  var service = ShoppingListFactory()

  // data binding
  controller.items = service.getItems()
  // operations
  controller.addItem = service.addItem
  controller.remove = service.remove
}


LimitedController.$inject = ['ShoppingListFactory'];
function LimitedController(ShoppingListFactory) {
  var controller = this;

  var service = ShoppingListFactory(3)

  // data binding
  controller.items = service.getItems()
  // operations
  controller.addItem = function(name, quantity) {
    try {
      service.addItem(name, quantity)
    } catch (error) {
      controller.errorMessage = error.message
    }
  }
  controller.remove = function(idx) {
    service.remove(idx)
    // clean error message
    if (controller.items.length < service.limit) {
      controller.errorMessage = undefined
    }
  }
}


function ShoppingListService(limit) {
  var service = this;

  // List of shopping items
  var items = [];

  // Limit
  service.limit = limit

  service.addItem = function (name, quantity) {
    if ((limit === undefined) || (
      (limit !== undefined) && (items.length < limit))) {
      items.push({
        name: name,
        quantity: quantity
      });
    } else {
      throw new Error("Max items ("+ limit +") reached."+
        " To add something else, please remove an item first.");
    }
  };

  service.remove = function(idx) {
    items.splice(idx, 1)
  }
  service.getItems = function () {
    return items;
  };
}

})();
