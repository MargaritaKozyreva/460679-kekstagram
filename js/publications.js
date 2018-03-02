'use strict';
(function () {
  var FILTERS_NAME = window.CONSTANTS.PUBLICATION_FILTERS;
  var LIKES = 'likes';
  var COMMENTS = 'comments';

  var picturesContainer = document.querySelector('.pictures');
  var filters = document.querySelector('.filters');
  var fragment = document.createDocumentFragment();

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

  function showPictures(array) {
    for (var k = 0; k < array.length; k++) {
      fragment.appendChild(getPublicationElement(array[k]));
    }
    picturesContainer.appendChild(fragment);
  }

  function shufflePictures(pictures) {
    var mixedPictures = [];
    while (mixedPictures.length < pictures.length) {
      var randomIndex = window.CONSTANTS.getRandomIndex(pictures);
      mixedPictures.push(pictures[randomIndex]);
      pictures.splice(randomIndex, 1);
    }

    return mixedPictures;
  }

  function sortPictures(pictures, sortMode) {
    if (sortMode === LIKES) {
      return pictures.sort(function (a, b) {
        return b.likes - a.likes;
      });
    } else if (sortMode === COMMENTS) {
      return pictures.sort(function (a, b) {
        return b.comments.length - a.comments.length;
      });
    }

    return pictures;
  }

  function filterChange(pictures, value) {
    var picturesCopy = pictures.slice();
    var filteredPictures;
    clearPhotos();

    function getValue() {
      switch (value) {
        case FILTERS_NAME.POPULAR: {
          filteredPictures = sortPictures(picturesCopy, LIKES);
          break;
        }
        case FILTERS_NAME.DISCUSSED: {
          filteredPictures = sortPictures(picturesCopy, COMMENTS);
          break;
        }
        case FILTERS_NAME.RECOMMEND: {
          filteredPictures = sortPictures(picturesCopy);
          break;
        }
        case FILTERS_NAME.RANDOM: {
          filteredPictures = shufflePictures(picturesCopy);
          break;
        }
      }

      showPictures(filteredPictures);
    }

    window.debounce.debounce(getValue);
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
