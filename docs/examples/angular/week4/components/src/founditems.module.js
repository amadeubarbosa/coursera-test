(function () {
'use strict';

angular.module('FoundItems',['Loading'])
.config(function () {
  console.log("FoundItems config fired.");
})
.run(function () {
  console.log("FoundItems run fired.");
});

})();