'use strict';

var createdWizards = [];
var commentPhrase = [
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
  var randNum = Math.round(Math.random() * (maxValue - minValue) + minValue);
  return randNum;
}

function getLikeValue() {
  return getRandomNumber(200, 15);
}

function getRandomComments() {
  var commentsArray = [];
  var randNumberComments = Math.round(Math.random() + 1);
  for (var i = 0; i < randNumberComments; i++) {
    commentsArray.push(commentPhrase[Math.round(Math.random() * (commentPhrase.length - 1))]);
  }
  return commentsArray;
}

function getPublication() {
  return {
    url: getPhotoURL(getRandomNumber(25, 1)),
    likes: getLikeValue(),
    comments: getRandomComments()
  };
}

var fragment = document.createDocumentFragment();
function getPublicationElement(photo) {
  var similarPictureTemplate = document.querySelector('#picture-template').content;
  var photoElement = similarPictureTemplate.cloneNode(true);
  photoElement.querySelector('.picture > img').src = photo.url;
  photoElement.querySelector('.picture-likes').textContent = photo.likes + '';
  photoElement.querySelector('.picture-comments').textContent = photo.comments.length + '';
  return photoElement;
}

for (var k = 0; k < 25; k++) {
  createdWizards.push(getPublication(k));
  fragment.appendChild(getPublicationElement(createdWizards[k]));
}

var appendPictures = document.querySelector('.pictures');
appendPictures.appendChild(fragment);
var overLay = document.querySelector('.gallery-overlay');
overLay.classList.remove('hidden');

overLay.querySelector('.gallery-overlay-image').src = createdWizards[0].url;
overLay.querySelector('.likes-count').textContent = createdWizards[0].likes + '';
overLay.querySelector('.comments-count').textContent = createdWizards[0].comments.length + '';
