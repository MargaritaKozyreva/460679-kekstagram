'use strict';

(function () {

  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout;

  window.debounce = {
    array: function (func) {
      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }
      lastTimeout = setTimeout(func, DEBOUNCE_INTERVAL);
    }
  };
})();
