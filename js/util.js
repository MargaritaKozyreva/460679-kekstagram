'use strict';

(function () {

  var ESC_KEYCODE = 27;

  window.CONSTANTS = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },

    getRandomIndex: function (array) {
      return Math.floor(Math.random() * array.length);
    },

    STEP_CHANGE: 25,

    CSS_FILTERS: {
      NONE: {
        NAME: 'none'
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
    },

    PUBLICATION_FILTERS: {
      RECOMMEND: 'recommend',
      POPULAR: 'popular',
      DISCUSSED: 'discussed',
      RANDOM: 'random'
    }
  };
})();
