'use strict';
(function () {
  var CONSTANTS = window.CONSTANTS;

  function getPhotoURL(id) {
    return 'photos/' + id + '.jpg';
  }

  function getRandomNumber(maxValue, minValue) {
    return Math.round(Math.random() * (maxValue - minValue) + minValue);
  }

  function getLikeValue() {
    return getRandomNumber(CONSTANTS.LIKES.MAX, CONSTANTS.LIKES.MIN);
  }

  function getRandomComments() {
    var commentsArray = [];
    var randNumberComments = Math.round(Math.random() + 1);
    for (var i = 0; i < randNumberComments; i++) {
      commentsArray.push(CONSTANTS.COMMENT_PHRASE[Math.round(Math.random() * (CONSTANTS.COMMENT_PHRASE.length - 1))]);
    }
    return commentsArray;
  }

  function getPublication() {
    return {
      url: getPhotoURL(getRandomNumber(CONSTANTS.PUBLICATIONS_COUNT, 1)),
      likes: getLikeValue(),
      comments: getRandomComments()
    };
  }

  function getPublicationElement(photo) {
    var similarPictureTemplate = document.querySelector('#picture-template').content;
    var photoElement = similarPictureTemplate.cloneNode(true);
    photoElement.querySelector('.picture > img').src = photo.url;
    photoElement.querySelector('.picture-likes').textContent = photo.likes + '';
    photoElement.querySelector('.picture-comments').textContent = photo.comments.length + '';
    return photoElement;
  }

  function generationAndRenderPictures(container) {
    var fragment = document.createDocumentFragment();
    var createdPublication = [];

    for (var k = 0; k < CONSTANTS.PUBLICATIONS_COUNT; k++) {
      createdPublication.push(getPublication(k));
      fragment.appendChild(getPublicationElement(createdPublication[k]));
    }

    container.appendChild(fragment);
  }
  generationAndRenderPictures(document.querySelector('.pictures'));
})();
