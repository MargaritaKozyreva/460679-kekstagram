'use strict';

window.picture = (function () {

  var similarPictureTemplate = document.querySelector('#picture-template').content;
  var fragment = document.createDocumentFragment();
  var picturesContainer = document.querySelector('.pictures');
  var PUBLICATIONS_COUNT = 25;
  var createdPublication = [];

  function getPublication() {
    return {
      url: window.data.getPhotoURL(),
      likes: window.data.getLikeValue(),
      comments: window.data.getRandomComments()
    };
  }

  function getPublicationElement(photo) {
    var photoElement = similarPictureTemplate.cloneNode(true);
    photoElement.querySelector('.picture > img').src = photo.url;
    photoElement.querySelector('.picture-likes').textContent = photo.likes + '';
    photoElement.querySelector('.picture-comments').textContent = photo.comments.length + '';
    return photoElement;
  }

  for (var k = 0; k < PUBLICATIONS_COUNT; k++) {
    createdPublication.push(getPublication(k));
    fragment.appendChild(getPublicationElement(createdPublication[k]));
  }

  picturesContainer.appendChild(fragment);
})();
