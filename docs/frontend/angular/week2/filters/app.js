(function () {
'use strict';

angular.module('MsgApp', [])
.controller('MsgController', MsgController)
.filter('loves', LovesFilter)
.filter('truth', TruthFilter)

function TruthFilter() {
	return function(input, target, replace) {
		return input.replace(target, replace)
	}
}
function LovesFilter() {
	return function(input) {
		return input.replace("likes","loves")
	}
}

MsgController.$inject = ['$scope', '$filter'];
MsgController.msg = "Yaakov likes to eat healthy snacks at night!";
function MsgController($scope, $filter) {
  $scope.stateOfBeing = "hungry";

  $scope.sayMessage = function () {
    return MsgController.msg;
  };
  $scope.sayLoveMessage = function() {
  	return $filter('uppercase')($filter('loves')(MsgController.msg))
  }

  $scope.feedYaakov = function () {
    $scope.stateOfBeing = "fed";
  };
}

})();
