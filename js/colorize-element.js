'use strict';

(function () {

  window.colorizeElement = function (element, array, action) {
    var current = 0;
    element.addEventListener('click', function () {
      current = ++current % array.length;
      action(element, array[current]);
    });
  };

})();
