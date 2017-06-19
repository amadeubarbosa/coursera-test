(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'src/templates/home.template.html'
  })
  .state('menu', {
    url: '/categories',
    templateUrl: 'src/templates/menu.template.html',
    controller: 'MenuController as menu',
    resolve: {
      list: ['MenuDataService', function(MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })
  .state('menu.items', {
    url: '/{shortname}/items',
    templateUrl: 'src/templates/items.template.html',
    controller: 'ItemsController as items',
    resolve: {
      data: [
        '$stateParams', 'MenuDataService',
        function ($stateParams, MenuDataService) {
          return MenuDataService.getItemsForCategory($stateParams.shortname)
        }
      ],
    }
  })
}

})();
