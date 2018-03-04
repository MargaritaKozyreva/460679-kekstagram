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
  var CODE = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
  };

  function sendRequest(params) {

    var method = params.method || METHODS.GET;
    var url = params.url;
    var onLoad = params.onLoad;
    var onError = params.onError;
    var data = params.data;

    var xhr = new XMLHttpRequest();
    xhr.timeout = TIMEOUT;
    xhr.responseType = RESPONSE_TYPE;

    function contentLoadHandler() {
      switch (xhr.status) {
        case CODE.SUCCESS:
          onLoad(xhr.response);
          break;
        case CODE.BAD_REQUEST:
          onError('Статус ответа: ' + xhr.status + '. Неверный запрос.');
          break;
        case CODE.FORBIDDEN:
          onError('Статус ответа: ' + xhr.status + '. Доступ запрещен.');
          break;
        case CODE.NOT_FOUND:
          onError('Статус ответа: ' + xhr.status + '. Ничего не найдено.');
          break;
        case CODE.SERVER_ERROR:
          onError('Статус ответа: ' + xhr.status + '. Внутренняя ошибка сервера.');
          break;
        default:
          onError('Статус ответа: ' + xhr.status + '' + xhr.statusText);
      }
    }

    function contentErrorHandler() {
      onError('Ошибка соединения');
    }

    function contentTimeoutHandler() {
      onError('Запрос не успел выполниться за ' + TIMEOUT + ' мс');
    }

    xhr.addEventListener('load', contentLoadHandler);
    xhr.addEventListener('error', contentErrorHandler);
    xhr.addEventListener('error', contentTimeoutHandler);
    xhr.open(method, url);
    xhr.send(data);
  }

  window.backend = {

    onError: function (status) {
      window.message.create('error', status, 'red');
    },

    onLoad: function () {
      window.message.create('success', 'Ваше фото успешно загружено.', 'green');
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
