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

var appendPictures = document.querySelector('.pictures');
appendPictures.appendChild(fragment);
var overLay = document.querySelector('.gallery-overlay');
overLay.classList.remove('hidden');

overLay.querySelector('.gallery-overlay-image').src = createdPublication[0].url;
overLay.querySelector('.likes-count').textContent = createdPublication[0].likes + '';
overLay.querySelector('.comments-count').textContent = createdPublication[0].comments.length + '';
