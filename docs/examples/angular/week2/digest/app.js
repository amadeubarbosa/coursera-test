(function () {
'use strict';

angular.module('CounterApp', [])
.controller('CounterController', CounterController);

CounterController.$inject = ['$scope', '$timeout'];
function CounterController($scope, $timeout) {

	$scope.counter = 0;

  $scope.showNumberOfWatchers = function () {
  	console.log('log # watchers: ',$scope.$$watchersCount)
  	console.log('current value: ', $scope.counter)
  };

  // ANGULAR TIMETOUT 
	$scope.increment = function() {
  	$timeout(function() {
			$scope.counter++;
			console.log("Counter incremented!")
		}, 2000)
  }
  // JAVASCRIPT TIMEOUT AND ANGULAR APPLY
  // $scope.increment = function() {
  //  	setTimeout(function() {
  //  		$scope.$apply(function() {
  //  			$scope.counter++;
  //  			console.log("Counter incremented!")
  //  		});
  // 	}, 2000)
  //  }

  // JAVASCRIPT TIMEOUT AND ANGULAR DIGEST
  // $scope.increment = function() {
  // 	setTimeout(function() {
  // 		$scope.counter++;
  // 		console.log("Counter incremented!")
  // 		// variable updated outside digest loop
  // 		// so we must re-check all properties
  // 		$scope.$digest()
  // 	}, 2000)
  // }

  // add my watcher, it'll be a second one
  // for the same 'counter' variable because
  // angular is already taken one by expressions
  $scope.$watch('counter', 
  	function(newValue, oldValue) {
  		console.log('old: ', oldValue)
  		console.log('new: ', newValue)
  	})
  $scope.setname = function() {
  	$scope.fullname = $scope.name
  }
}

})();
