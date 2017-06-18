(function () {
'use strict';

angular.module('Loading')
.component('loading', {
  templateUrl: 'src/loading.template.html',
  controller: LoadingController
});


LoadingController.$inject = ['$rootScope']
function LoadingController($rootScope) {
  var $ctrl = this;

  var cancelListener = $rootScope.$on('narrowdown:loading', function (event, data) {
    //console.log("LoadingController(event,data) ", event, data);
    $ctrl.loading = data
  });

  $ctrl.$onDestroy = function () {
    cancelListener();
  };

};

})();
