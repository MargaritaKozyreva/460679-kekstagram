'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var COMMENT_PHRASE = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  window.CONSTANTS = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    STEP_CHANGE: 25,
    PUBLICATIONS_COUNT: 25,
    COMMENT_PHRASE: COMMENT_PHRASE,
    LIKES: {
      MIN: 15,
      MAX: 200
    },
    FILTERS: {
      NONE: {
        NAME: 'none',
      },
      CHROME: {
        NAME: 'chrome',
        CSS_FILTER: 'grayscale'
      },
      SEPIA: {
        NAME: 'sepia',
        CSS_FILTER: 'sepia'
      },
      MARVIN: {
        NAME: 'marvin',
        CSS_FILTER: 'invert'
      },
      PHOBOS: {
        NAME: 'phobos',
        CSS_FILTER: 'blur'
      },
      HEAT: {
        NAME: 'heat',
        CSS_FILTER: 'brightness'
      }
    }
  };
})();
