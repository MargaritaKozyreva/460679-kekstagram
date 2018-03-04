'use strict';

(function () {
  var INTERVAL = 3000;
  var filters = document.querySelector('.filters');

  window.message = {
    create: function (classname, text, color) {
      var message = document.createElement('div');
      message.className = classname;
      message.textContent = text;
      message.style.textAlign = 'center';
      message.style.backgroundColor = color;
      message.style.zIndex = '1';
      document.body.insertBefore(message, filters);
      setTimeout(function () {
        document.body.removeChild(message);
      }, INTERVAL);
    },
  };
})();
