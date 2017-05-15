(function () {
'use strict';

angular.module('ShoppingListApp', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService']
function ToBuyController(service) {
	var self = this

	// data binding
	self.items = service.pending
	// operations
	self.bought = service.transfer
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService']
function AlreadyBoughtController(service) {
	var self = this
	
	// data binding
	self.items = service.done
	// operations
}

function ShoppingListCheckOffService (){
  var service = this

  // List of shopping items
  service.pending = [
  {
    name: "Beer",
    quantity: "2"
  },
  {
    name: "Doritos",
    quantity: "200"
  },
  {
    name: "Vodka",
    quantity: "5"
  },
  {
    name: "Water",
    quantity: "5"
  },
  {
    name: "Estomazil pills",
    quantity: "5"
  }]

  service.done = []

  service.transfer = function (idx) {
  	var item = service.pending.splice(idx,1)[0]
    service.done.push(item);
  };
}

})();