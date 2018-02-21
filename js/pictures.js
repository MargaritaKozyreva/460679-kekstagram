'use strict';

var createdPublication = [];
var PUBLICATIONS_COUNT = 25;
var COMMENT_PHRASE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

function getPhotoURL(id) {
  return 'photos/' + id + '.jpg';
}

function getRandomNumber(maxValue, minValue) {
  return Math.round(Math.random() * (maxValue - minValue) + minValue);
}

function getLikeValue() {
  return getRandomNumber(200, 15);
}

function getRandomComments() {
  var commentsArray = [];
  var randNumberComments = Math.round(Math.random() + 1);
  for (var i = 0; i < randNumberComments; i++) {
    commentsArray.push(COMMENT_PHRASE[Math.round(Math.random() * (COMMENT_PHRASE.length - 1))]);
  }
  return commentsArray;
}

function getPublication() {
  return {
    url: getPhotoURL(getRandomNumber(PUBLICATIONS_COUNT, 1)),
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

var fragment = document.createDocumentFragment();
for (var k = 0; k < PUBLICATIONS_COUNT; k++) {
  createdPublication.push(getPublication(k));
  fragment.appendChild(getPublicationElement(createdPublication[k]));
}

var picturesContainer = document.querySelector('.pictures');
picturesContainer.appendChild(fragment);

// 4 задание

var ESC_СODE = 27;
var STEP_CHANGE = 25;
var uploadForm = document.querySelector('#upload-select-image');
var uploadFile = uploadForm.querySelector('#upload-file');
var closeUploadFormButton = uploadForm.querySelector('.upload-form-cancel');
var resizeDecButton = uploadForm.querySelector('.upload-resize-controls-button-dec');
var resizeIncButton = uploadForm.querySelector('.upload-resize-controls-button-inc');
var uploadResizeValue = uploadForm.querySelector('.upload-resize-controls-value');
var effectImagePrewiew = uploadForm.querySelector('.effect-image-preview');
var uploadEffect = uploadForm.querySelectorAll('[name="effect"]');
var uploadEffectLevel = uploadForm.querySelector('.upload-effect-level');
var uploadEffectLevelLine = uploadForm.querySelector('.upload-effect-level-line');
var uploadLevelPin = uploadForm.querySelector('.upload-effect-level-pin');
var uploadLevelValue = uploadForm.querySelector('.upload-effect-level-value');
var uploadLevelVal = uploadForm.querySelector('.upload-effect-level-val');
var uploadFormOverlay = document.querySelector('.upload-overlay');
var uploadMessage = document.querySelector('.upload-message');

var gallery = document.querySelector('.gallery-overlay');
var galleryClose = gallery.querySelector('.gallery-overlay-close');
var galleryPreview = document.querySelector('.gallery-overlay-image');
var galleryLikes = document.querySelector('.gallery-overlay-controls-like > .likes-count');
var galleryComments = document.querySelector('.gallery-overlay-controls-comments > .comments-count');

picturesContainer.addEventListener('click', function (evt) {
  evt.preventDefault();

  var target = evt.target;

  while (target !== picturesContainer) {
    if (target.className === 'picture') {
      galleryPreview.src = target.querySelector('img').src;
      galleryLikes.textContent = target.querySelector('.picture-likes').textContent;
      galleryComments.textContent = target.querySelector('.picture-comments').textContent;
      gallery.classList.remove('hidden');

      return;
    }
    target = target.parentNode;
  }
});

closeUploadFormButton.addEventListener('click', function () {
  effectImagePrewiew.style.filter = 'none';
  uploadFormOverlay.classList.add('hidden');
  uploadMessage.classList.add('hidden');
});

galleryClose.addEventListener('click', function () {
  gallery.classList.add('hidden');
});

uploadFile.addEventListener('change', function () {
  uploadFormOverlay.classList.remove('hidden');
  uploadMessage.classList.remove('hidden');
  effectImagePrewiew.style.transform = 'scale(1)';
});

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_СODE) {
    uploadFormOverlay.classList.add('hidden');
    uploadMessage.classList.add('hidden');
    uploadForm.reset();
  }
});

function resizeButtonHandler(evt) {
  var uploadNumber = parseInt(uploadResizeValue.value, 10);
  var type = evt.target.dataset.type;

  if (type === 'dec' && uploadNumber > STEP_CHANGE && uploadNumber <= 100) {
    uploadNumber = uploadNumber - STEP_CHANGE;
  } else if (type === 'inc' && uploadNumber >= STEP_CHANGE && uploadNumber < 100) {
    uploadNumber = uploadNumber + STEP_CHANGE;
  }
  uploadResizeValue.value = uploadNumber + '%';
  effectImagePrewiew.style.transform = 'scale(' + uploadNumber / 100 + ')';
}

resizeDecButton.addEventListener('click', resizeButtonHandler);
resizeIncButton.addEventListener('click', resizeButtonHandler);

var filterValue = 'none';

uploadEffectLevel.style.display = 'none';
for (var i = 0; i < uploadEffect.length; i++) {
  uploadEffect[i].addEventListener('click', function (evt) {
    for (var j = 0; j < uploadEffect.length; j++) {
      effectImagePrewiew.classList.remove('effect-' + uploadEffect[j].value);
    }
    uploadEffectLevel.style.display = 'block';
    effectImagePrewiew.classList.add('effect-' + evt.target.value);
    filterValue = evt.target.value;
    if (filterValue === 'none') {
      uploadEffectLevel.style.display = 'none';
    }
    uploadLevelPin.style.left = '100%';
    uploadLevelVal.style.width = '100%';
    effectImagePrewiew.style.filter = '';
  });
}

uploadLevelPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  var startCoords = {
    x: evt.clientX,
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    var shift = {
      x: moveEvt.clientX - startCoords.x
    };
    startCoords = {
      x: moveEvt.clientX
    };
    var newCoords = uploadLevelPin.offsetLeft + shift.x;
    var newCoordsMaxWidth = uploadEffectLevelLine.offsetWidth;
    var newCoordsPercent = newCoordsMaxWidth / 100;

    if (newCoords >= 0 && newCoords <= newCoordsMaxWidth) {
      uploadLevelPin.style.left = newCoords + 'px';
      uploadLevelVal.style.width = newCoords / newCoordsPercent + '%';
      uploadLevelValue.value = newCoords / newCoordsPercent;
      switch (filterValue) {
        case 'chrome': effectImagePrewiew.style.filter = 'grayscale(' + uploadLevelValue.value / 100 + ')'; break;
        case 'sepia': effectImagePrewiew.style.filter = 'sepia(' + uploadLevelValue.value / 100 + ')'; break;
        case 'marvin': effectImagePrewiew.style.filter = 'invert(' + uploadLevelValue.value + '%' + ')'; break;
        case 'phobos': effectImagePrewiew.style.filter = 'blur(' + uploadLevelValue.value * 3 / 100 + 'px' + ')'; break;
        case 'heat': effectImagePrewiew.style.filter = 'brightness(' + uploadLevelValue.value * 3 / 100 + ')'; break;
      }
    }
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

// 5 задание

var uploadFormHashtags = document.querySelector('.upload-form-hashtags');
var uploadFormDesc = document.querySelector('.upload-form-description');

function descriptionValid() {
  uploadFormDesc.setCustomValidity('');
  uploadFormDesc.style.outline = '';
}

function descriptionInvalid() {
  if (uploadFormDesc.validity.tooLong) {
    uploadFormDesc.setCustomValidity('длина комментария не может составлять больше 140 символов');
    uploadFormDesc.style.outline = '2px dotted red';
  }
}

function hashtagsValid() {
  uploadFormHashtags.style.outline = '';
  uploadFormHashtags.setCustomValidity('');
}

var invalidityText;
var hashtagValue;

function hashtagsInvalid() {

  hashtagValue = uploadFormHashtags.value.trim();

  if (hashtagValue) {
    var hashtagsArray = hashtagValue.split(' ');

    invalidityText = '';

    for (var x = 0; x < hashtagsArray.length && invalidityText === ''; x++) {
      if (!(hashtagsArray[x].startsWith('#'))) {
        invalidityText = 'Хэш-тег начинается с символа # (решётка) и состоит из одного слова';
      } else if (hashtagsArray.indexOf(hashtagsArray[x]) !== x) {
        invalidityText = 'Один и тот же хэш-тег не может быть использован дважды';
      } else if (hashtagsArray[x].split('#').length > 2) {
        invalidityText = 'Хэш-теги должны разделяться пробелами';
      } else if (hashtagsArray[x].length > 21) { // учитываем #
        invalidityText = 'Максимальная длина одного хэш-тега 20 символов';
      } else if (hashtagsArray.length > 5) {
        invalidityText = 'Вы не должны указать больше пяти (5) хэш-тегов';
      }
    }

    if (invalidityText) {
      uploadFormHashtags.style.outline = '2px solid red';
      uploadFormHashtags.setCustomValidity(invalidityText);
    } else {
      hashtagsValid();
    }
  }
}

uploadFormHashtags.addEventListener('change', hashtagsValid, false);

uploadForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  invalidityText = '';
  hashtagsInvalid();
  descriptionInvalid();
  if (!invalidityText) {
    descriptionValid();
    uploadFormOverlay.classList.add('hidden');
    uploadMessage.classList.add('hidden');
    uploadForm.reset();
  }
});

