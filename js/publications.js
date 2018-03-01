'use strict';
(function () {

  var picturesContainer = document.querySelector('.pictures');

  function getPublicationElement(picture) {
    var similarPictureTemplate = document.querySelector('#picture-template').content;
    var photoElement = similarPictureTemplate.cloneNode(true);
    photoElement.querySelector('.picture > img').src = picture.url;
    photoElement.querySelector('.picture-likes').textContent = picture.likes + '';
    photoElement.querySelector('.picture-comments').textContent = picture.comments.length + '';
    return photoElement;
  }

  function successHandler(pictures) {

    var fragment = document.createDocumentFragment();

    for (var k = 0; k < pictures.length; k++) {
      fragment.appendChild(getPublicationElement(pictures[k]));
    }
    picturesContainer.appendChild(fragment);
    picturesContainer.classList.remove('hidden');
  }
  window.backend.load(successHandler, window.backend.onError);
})();
