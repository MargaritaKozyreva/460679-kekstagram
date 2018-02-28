'use strict';
(function () {
  var CONSTANTS = window.CONSTANTS;
  var picturesContainer = document.querySelector('.pictures');

  function getPublicationElement(photo) {
    var similarPictureTemplate = document.querySelector('#picture-template').content;
    var photoElement = similarPictureTemplate.cloneNode(true);
    photoElement.querySelector('.picture > img').src = photo.url;
    photoElement.querySelector('.picture-likes').textContent = photo.likes + '';
    photoElement.querySelector('.picture-comments').textContent = photo.comments.length + '';
    return photoElement;
  }

  function successHandler(photos) {

    var fragment = document.createDocumentFragment();

    for (var k = 0; k < CONSTANTS.PUBLICATIONS_COUNT; k++) {
      fragment.appendChild(getPublicationElement(photos[k]));
    }
    picturesContainer.appendChild(fragment);
    picturesContainer.classList.remove('hidden');
  }
  window.backend.load(successHandler, window.backend.onError);
})();
