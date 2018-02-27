'use strict';
(function () {

  var DATA_URL = 'https://js.dump.academy/kekstagram/data';
  var UPLOAD_URL = 'https://js.dump.academy/kekstagram';
  var request = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.timeout = 10000;
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          break;
        case 400:
          onError('Статус ответа: ' + xhr.status + '. В запросе синтаксическая ошибка.');
          break;
        default:
          onError('Статус ответа: ' + xhr.status + '' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
    });

    return xhr;
  };

  window.backend = {
    DATA_URL: DATA_URL,
    UPLOAD_URL: UPLOAD_URL,
    request: request,

    load: function (onLoad, onError) {
      var xhr = request(onLoad, onError);
      xhr.open('GET', DATA_URL);
      xhr.send();
    },

    send: function (data, onLoad, onError) {
      var xhr = request(onLoad, onError);
      xhr.open('POST', UPLOAD_URL);
      xhr.send(data);
    }
  };
})();

