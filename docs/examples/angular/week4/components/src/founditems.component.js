(function () {
'use strict';

angular.module('FoundItems')
.component('foundItems',{
  templateUrl: 'src/founditems.template.html',
  controller: FoundItemsComponentController,
  bindings: {
    items: '<',
    title: '=',
    onRemove: '&',
  }
})

FoundItemsComponentController.$inject=['$rootScope', '$element'];
function FoundItemsComponentController($rootScope, $element) {
	var $ctrl = this;
	var total;

	$ctrl.$onInit = function() {
		total = 0
	}

	$ctrl.$onChanges = function(changes) { // only available for one-way bindings
		if (changes.items && !changes.items.isFirstChange()) {
			var previous = changes.items.previousValue
			var current = changes.items.currentValue

			console.log("FoundItemsComponentController $onChanges items previously=", previous)
			console.log("FoundItemsComponentController $onChanges items currently=", current)
			
			if ( (previous === undefined) && (current instanceof Array) ) {
        $ctrl.title = "Pick " + $ctrl.items.length + " items"
			}
		}
		console.log("FoundItemsComponentController $onChanges first?", changes.items.isFirstChange())
	}

	// $ctrl.$doCheck = function() { // dirty diggest loop
	// 	if ($ctrl.items && $ctrl.items.length !== total) {
	// 		total = $ctrl.items.length
	// 		console.log("FoundItemsComponentController $doCheck (diggest) total=" + total)
	// 	}
	// }

	$ctrl.remove = function(index) {
		console.log("FoundItemsComponentController remove called "+ index)
		$ctrl.onRemove({idx : index})
		if ($ctrl.items.length == 0){
      $ctrl.title = "List is empty again, try a new search!"
    } else {
      $ctrl.title = "Pick " + $ctrl.items.length + " items"
    }
	}
}

})();