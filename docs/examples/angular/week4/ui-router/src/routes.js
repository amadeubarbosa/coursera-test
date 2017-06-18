(function () {
'use strict';

angular.module('ShoppingList')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider
  .state('home', {     // Home page
    url: '/',
    templateUrl: 'src/shoppinglist/templates/home.template.html'
  })
  .state('mainList', { // Premade list page
    url: '/main-list',
    templateUrl: 'src/shoppinglist/templates/main-shoppinglist.template.html',
    controller: 'MainShoppingListController as mainList',
    resolve: {
      items: ['ShoppingListService', function(ShoppingListService) {
        return ShoppingListService.getItems();
      }]
    }
  })
  .state('mainList.itemDetail', {
    url: '/item-detail/{itemId}', // explicit url-parameters
    templateUrl: 'src/shoppinglist/templates/item-detail.template.html',
    controller: "ItemDetailController as itemDetail",
    //hidden parameters:
    // params: {
    //   itemId: null
    // },
    //if no nested view (state: 'itemDetail'):
    // resolve: {
    //   item: ['$stateParams', 'ShoppingListService', 
    //     function($stateParams, ShoppingListService) {
    //       return ShoppingListService.getItems().then(
    //         function(result){
    //           return result[$stateParams.itemId]
    //         })
    //     }]
    // }
  })
}

})();
