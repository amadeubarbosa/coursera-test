(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope', '$filter'];
function LunchCheckController($scope, $filter) {
  $scope.check = function () {
  	if (!$scope.list) {$scope.list = "";}
  	var stuff = $scope.list.split(",").filter(
  		function(item) {
  			return (item.trim().length > 0)
  		})

  	if (stuff.length === 0) {
  		$scope.result = "Please enter data first"
  		$scope.color = 'red'
  		return;
  	}
  	$scope.color = 'green'  	
  	if (stuff.length <= 3) {
  		$scope.result = "Enjoy!"
  	} else {$scope.result = "Too Much!"};
  };
}

})();