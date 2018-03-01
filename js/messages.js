'use strict';

(function () {

  var uploadForm = document.querySelector('#upload-select-image');

  window.messages = {
    createMessage: function (classname, text, color) {
      var message = document.createElement('div');
      message.className = classname;
      message.innerHTML = text;
      message.style.textAlign = 'center';
      message.style.backgroundColor = color;
      message.style.zIndex = '999999';
      document.body.insertBefore(message, uploadForm);
      setTimeout(function () {
        document.body.removeChild(message);
      }, 3000);
    },
  };
})();
