(function () {
'use strict';

angular.module('MenuSearch',[])
.constant('ITEMS_URL', 'https://davids-restaurant.herokuapp.com/menu_items.json')
.config(function () {
  console.log("MenuSearch config fired.");
})
.run(function () {
  console.log("MenuSearch run fired.");
});

})();