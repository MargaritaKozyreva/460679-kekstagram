'use strict';
(function () {

  var DATA_URL = 'https://js.dump.academy/kekstagram/data';
  var UPLOAD_URL = 'https://js.dump.academy/kekstagram';
  var METHODS = {
    GET: 'GET',
    POST: 'POST'
  };
  var TIMEOUT = 10000;
  var RESPONSE_TYPE = 'json';

  function sendRequest(params) {

    var method = params.method || METHODS.GET;
    var url = params.url;
    var onLoad = params.onLoad;
    var onError = params.onError;
    var data = params.data;

    var xhr = new XMLHttpRequest();
    xhr.timeout = TIMEOUT;
    xhr.responseType = RESPONSE_TYPE;

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
      onError('Запрос не успел выполниться за ' + TIMEOUT + ' мс');
    }

    xhr.addEventListener('load', load);
    xhr.addEventListener('error', error);
    xhr.addEventListener('error', timeout);
    xhr.open(method, url);
    xhr.send(data);
  }

  window.backend = {

    onError: function (status) {
      window.messages.createMessage('error', status, 'red');
    },

    onLoad: function () {
      window.messages.createMessage('success', 'Ваше фото успешно загружено.', 'green');
    },

    load: function (onLoad, onError) {
      sendRequest({
        url: DATA_URL,
        onLoad: onLoad,
        onError: onError
      });
    },

    upload: function (data, onLoad, onError) {
      sendRequest({
        method: METHODS.POST,
        url: UPLOAD_URL,
        onLoad: onLoad,
        onError: onError,
        data: data
      });
    }
  };
})();
