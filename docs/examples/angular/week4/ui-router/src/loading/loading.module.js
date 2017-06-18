(function () {
'use strict';

angular.module('Loading', []);

angular.module('Loading')
.config(function () {
  console.log("Loading config fired.");
}).
run(function () {
  console.log("Loading run fired.");
});

})();
