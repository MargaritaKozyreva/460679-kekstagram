'use strict';

var OBJECTS_ARRAY = [];
var UNIQUE_PHOTO = [];

var commentPhrase = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

function getRandomObject() {
  var TEMP_URL = '';
  var TEMP_LIKES = 0;
  var TEMP_COMMENTS = [];
  var countComments = Math.round(Math.random() + 1);
  var marker = 0;
  while (marker === 0) {
    TEMP_URL = 'photos/' + Math.round(Math.random() * (25 - 1) + 1) + '.jpg';
    if (UNIQUE_PHOTO.indexOf(TEMP_URL) < 0) {
      UNIQUE_PHOTO.push(TEMP_URL);
      marker = 1;
    }
  }
  TEMP_LIKES = Math.round(Math.random() * (200 - 15) + 15);
  for (var i = 0; i < countComments; i++) {
    TEMP_COMMENTS.push(commentPhrase[Math.round(Math.random() * (commentPhrase.length - 1))]);
  }
  var randomObj = {
    url: TEMP_URL,
    likes: TEMP_LIKES,
    comments: TEMP_COMMENTS
  };
  return randomObj;
}
var fragment = document.createDocumentFragment();

var showPhoto = function (photo) {
  var similarPictureTemplate = document.querySelector('#picture-template').content;
  var photoElement = similarPictureTemplate.cloneNode(true);
  photoElement.querySelector('.picture >img').src = photo.url;
  photoElement.querySelector('.picture-likes').textContent = photo.likes + '';
  photoElement.querySelector('.picture-comments').textContent = photo.comments.length + '';
  return photoElement;
};

for (var k = 0; k < 25; k++) {
  OBJECTS_ARRAY.push(getRandomObject());
  fragment.appendChild(showPhoto(OBJECTS_ARRAY[k]));
}

var appendPictures = document.querySelector('.pictures');
appendPictures.appendChild(fragment);
var overLay = document.querySelector('.gallery-overlay');
overLay.classList.remove('hidden');

overLay.querySelector('.gallery-overlay-image').src = OBJECTS_ARRAY[0].url;
overLay.querySelector('.likes-count').textContent = OBJECTS_ARRAY[0].likes + '';
overLay.querySelector('.comments-count').textContent = OBJECTS_ARRAY[0].comments.length + '';

