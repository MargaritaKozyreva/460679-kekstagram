'use strict';
var ESC = 27;
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

var appendPictures = document.querySelector('.pictures');
appendPictures.appendChild(fragment);

/* var overLay = document.querySelector('.gallery-overlay');
overLay.classList.remove('hidden');

overLay.querySelector('.gallery-overlay-image').src = createdPublication[0].url;
overLay.querySelector('.likes-count').textContent = createdPublication[0].likes + '';
overLay.querySelector('.comments-count').textContent = createdPublication[0].comments.length + '';*/

var upploadFile = document.querySelector('#upload-file');
var closeUploadForm = document.querySelector('.upload-form-cancel');
var uploadResizeDec = document.querySelector('.upload-resize-controls-button-dec');
var uploadResizeInc = document.querySelector('.upload-resize-controls-button-inc');
var uploadResizeValue = document.querySelector('.upload-resize-controls-value');
var effectImagePrewiew = document.querySelector('.effect-image-preview');
var uploadEffect = document.querySelectorAll('[name="effect"]');
var uploadEffectLevel = document.querySelector('.upload-effect-level');
var uploadLevelPin = document.querySelector('.upload-effect-level-pin');
var uploadLevelValue = document.querySelector('.upload-effect-level-value');
var uploadLevelVal = document.querySelector('.upload-effect-level-val');
var filterValue = 'none';

upploadFile.addEventListener('change', function () {
  document.querySelector('.upload-overlay').classList.remove('hidden');
  document.querySelector('.upload-message').classList.remove('hidden');

  effectImagePrewiew.style.transform = 'scale(1)';
  uploadResizeValue.value = '100%';
});

closeUploadForm.addEventListener('click', function () {
  document.querySelector('.upload-overlay').classList.add('hidden');
  document.querySelector('.upload-message').classList.add('hidden');
  effectImagePrewiew.style.filter = 'none';
  uploadEffectLevel.style.display = 'none';
});

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC) {
    document.querySelector('.upload-overlay').classList.add('hidden');
    document.querySelector('.upload-message').classList.add('hidden');
    effectImagePrewiew.style.filter = 'none';
    uploadEffectLevel.style.display = 'none';
  }
});

var STEP_CHANGE = 25;

uploadResizeDec.addEventListener('click', function () {
  var uploadNumber = Number.parseInt(uploadResizeValue.value, 0);
  if (uploadNumber > STEP_CHANGE && uploadNumber <= 100) {
    uploadNumber = uploadNumber - STEP_CHANGE;
    uploadResizeValue.value = uploadNumber + '%';
    effectImagePrewiew.style.transform = 'scale(' + uploadNumber / 100 + ')';
  }
});

uploadResizeInc.addEventListener('click', function () {
  var uploadNumber = Number.parseInt(uploadResizeValue.value, 0);
  if (uploadNumber >= STEP_CHANGE && uploadNumber < 100) {
    uploadNumber = uploadNumber + STEP_CHANGE;
    uploadResizeValue.value = uploadNumber + '%';
    effectImagePrewiew.style.transform = 'scale(' + uploadNumber / 100 + ')';
  }
});

uploadEffectLevel.style.display = 'none';
for (var i = 0; i < 6; i++) {
  uploadEffect[i].addEventListener('click', function () {
    for (var j = 0; j < uploadEffect.length; j++) {
      effectImagePrewiew.classList.remove('effect-' + uploadEffect[j].value);
    }
    uploadEffectLevel.style.display = 'block';
    effectImagePrewiew.classList.add('effect-' + this.value);
    filterValue = this.value;
    if (filterValue === 'none') {
      uploadEffectLevel.style.display = 'none';
    }
    uploadLevelPin.style.left = '450px';
    uploadLevelVal.style.width = 450 / 4.5 + '%';
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
    if (newCoords >= 0 && newCoords <= 450) {
      uploadLevelPin.style.left = newCoords + 'px';
      uploadLevelVal.style.width = newCoords / 4.5 + '%';
      uploadLevelValue.value = newCoords / 4.5;
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

