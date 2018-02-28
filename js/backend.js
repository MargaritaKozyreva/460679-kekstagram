'use strict';
(function () {

  var DATA_URL = 'https://js.dump.academy/kekstagram/data';
  var UPLOAD_URL = 'https://js.dump.academy/kekstagram';

  var callback = function (method, url, onLoad, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.timeout = 10000;
    xhr.responseType = 'json';

    function load() {
      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          break;
        case 400:
          onError('Статус ответа: ' + xhr.status + '. Неверный запрос.');
          break;
        case 404:
          onError('Статус ответа: ' + xhr.status + '. Ничего не найдено.');
          break;
        case 500:
          onError('Статус ответа: ' + xhr.status + '. Внутренняя ошибка сервера.');
          break;
        default:
          onError('Статус ответа: ' + xhr.status + '' + xhr.statusText);
      }
    }

    function error() {
      onError('Ошибка соединения');
    }

    function timeout() {
      onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
    }

    xhr.addEventListener('load', load);
    xhr.addEventListener('error', error);
    xhr.addEventListener('error', timeout);
    xhr.open(method, url);
    xhr.send(data);

    return xhr;
  };

  window.backend = {
    DATA_URL: DATA_URL,
    UPLOAD_URL: UPLOAD_URL,

    onError: function (status) {
      window.messages.createMessage('error', status, 'red');
    },

    onLoad: function () {
      window.messages.createMessage('success', 'Ваше фото успешно загружено.', 'green');
    },

    load: function (onLoad, onError) {
      callback('GET', DATA_URL, onLoad, onError);
    },

    upload: function (data, onLoad, onError) {
      callback('POST', UPLOAD_URL, onLoad, onError, data);
    },
  };
})();
