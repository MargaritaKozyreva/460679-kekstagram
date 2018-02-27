'use strict';

(function () {

  var uploadForm = document.querySelector('#upload-select-image');

  window.messages = {
    createMessage: function (classname, text) {
      var message = document.createElement('div');
      message.className = classname;
      message.innerHTML = text;
      message.style.textAlign = 'center';
      document.body.insertBefore(message, uploadForm);
      setTimeout(function () {
        document.body.removeChild(message);
      }, 3000);
    },
  };
})();
