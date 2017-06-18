(function () {
'use strict';

angular.module('Loading')
.component('loading', {
  templateUrl: 'src/loading/loading.template.html',
  controller: LoadingController
});


LoadingController.$inject = ['$rootScope', '$transitions']
function LoadingController($rootScope, $transitions) {
  var $ctrl = this;
  var cancellers = [];

  $ctrl.$onInit = function () {
    cancellers.push($transitions.onStart({}, function(trans){
      $ctrl.loading = true
    }))

    cancellers.push($transitions.onSuccess({}, function(trans){
      $ctrl.loading = false
    }))

    cancellers.push($transitions.onError({}, function(trans){
      $ctrl.loading = false
    }))
  };

  $ctrl.$onDestroy = function () {
    cancellers.forEach(function (cancel) {
      cancel();
    });
  };

};

})();
