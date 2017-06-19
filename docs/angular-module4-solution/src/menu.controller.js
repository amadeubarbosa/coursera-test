(function () {
'use strict';

angular.module('MenuApp')
.controller('MenuController', MenuController);

MenuController.$inject = ['list'];
function MenuController(list) {
  this.list = list;
}

})();
