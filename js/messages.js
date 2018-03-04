'use strict';

(function () {
  var INTERVAL = 3000;
  var filters = document.querySelector('.filters');

  window.messages = {
    createText: function (classname, text, color) {
      var message = document.createElement('div');
      message.className = classname;
      message.textContent = text;
      message.style.textAlign = 'center';
      message.style.backgroundColor = color;
      message.style.zIndex = '1';
<<<<<<< HEAD
      document.body.insertBefore(message, filters);
=======
      document.body.insertBefore(message, uploadForm);
>>>>>>> cf80999677006c89edd9b683084c794ccf068266
      setTimeout(function () {
        document.body.removeChild(message);
      }, INTERVAL);
    },
  };
})();
