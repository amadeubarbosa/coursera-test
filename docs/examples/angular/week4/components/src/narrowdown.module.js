(function () {
'use strict';

angular.module('NarrowItDown', ['FoundItems', 'MenuSearch'])
.config(function () {
  console.log("NarrowItDown config fired.");
})
.run(function () {
  console.log("NarrowItDown run fired.");
});

})();