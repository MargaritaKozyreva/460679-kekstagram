'use strict';
(function () {

  var picturesContainer = document.querySelector('.pictures');
  var filters = document.querySelector('.filters');
  var fragment = document.createDocumentFragment();
  var DEBOUNCE_INTERVAL = 500;
  var FILTERSNAME = window.CONSTANTS.FILTERS;
  var lastTimeout;

  function getPublicationElement(picture) {
    var similarPictureTemplate = document.querySelector('#picture-template').content;
    var photoElement = similarPictureTemplate.cloneNode(true);
    photoElement.querySelector('.picture > img').src = picture.url;
    photoElement.querySelector('.picture-likes').textContent = picture.likes + '';
    photoElement.querySelector('.picture-comments').textContent = picture.comments.length + '';
    return photoElement;
  }
  function clearPhotos() {
    var allPhotos = document.querySelectorAll('.picture');
    allPhotos.forEach(function (item) {
      item.parentNode.removeChild(item);
    });
  }

  function getRandomIndex(array) {
    return Math.floor(Math.random() * array.length);
  }

  function showPictures(array) {
    for (var k = 0; k < array.length; k++) {
      fragment.appendChild(getPublicationElement(array[k]));
    }
    picturesContainer.appendChild(fragment);
  }

  function shufflePictures(array) {
    clearPhotos();
    var newArray = array.slice();
    var mixedPictures = [];
    while (mixedPictures.length < array.length) {
      var randomIndex = getRandomIndex(newArray);
      mixedPictures.push(newArray[randomIndex]);
      newArray.splice(randomIndex, 1);
    }
    showPictures(mixedPictures);
    return mixedPictures;
  }

  function sortPictures(pictures, sortmode) {
    var defaultPhotos = pictures.slice();
    clearPhotos();

    if (sortmode === 'likes') {
      defaultPhotos.sort(function (a, b) {
        return b.likes - a.likes;
      });
    } else if (sortmode === 'comments') {
      defaultPhotos.sort(function (a, b) {
        return b.comments.length - a.comments.length;
      });
    }
    showPictures(defaultPhotos);
  }

  function filterChange(pictures, value) {
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(function () {
      if (value === FILTERSNAME.POPULAR.NAME) {
        sortPictures(pictures, 'likes');
      } else if (value === FILTERSNAME.DISCUSSED.NAME) {
        sortPictures(pictures, 'comments');
      } else if (value === FILTERSNAME.RECOMMEND.NAME) {
        sortPictures(pictures);
      } else if (value === FILTERSNAME.RANDOM.NAME) {
        shufflePictures(pictures);
      }
    }, DEBOUNCE_INTERVAL);
  }

  function successHandler(pictures) {

    showPictures(pictures);
    filters.classList.remove('filters-inactive');

    filters.addEventListener('click', function (evt) {
      if (evt.target.type === 'radio') {
        var value = evt.target.value;
        filterChange(pictures, value);
      }
    });
  }

  window.backend.load(successHandler, window.backend.onError);

})();
