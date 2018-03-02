'use strict';
(function () {

  var uploadForm = document.querySelector('#upload-select-image');
  var uploadEffect = uploadForm.querySelector('.upload-effect-controls');
  var effectImagePreview = uploadForm.querySelector('.effect-image-preview');
  var FILTERS = window.CONSTANTS.CSS_FILTERS;

  var filterValue;

  var setValue = function (evt) {
    var target = evt.target;
    if (target.type === 'radio') {
      var filter = evt.target.value;
      window.effects.filterChange(filter);
      setFilter(filter);
    }
  };

  var setFilter = function (filter) {
    effectImagePreview.classList = '';
    effectImagePreview.style = '';
    effectImagePreview.style.filter = '';
    effectImagePreview.classList.add('effect-' + filter);
    window.effects.resetSlider('100%');
    filterValue = filter;
  };

  uploadEffect.addEventListener('click', setValue);

  window.filters = {
    setLevelEffect: function (value) {
      switch (filterValue) {

        case FILTERS.CHROME.NAME: {
          effectImagePreview.style.filter = FILTERS.CHROME.CSS_FILTER + '(' + value / 100 + ')';
          break;
        }

        case FILTERS.SEPIA.NAME: {
          effectImagePreview.style.filter = FILTERS.SEPIA.CSS_FILTER + '(' + value / 100 + ')';
          break;
        }

        case FILTERS.MARVIN.NAME: {
          effectImagePreview.style.filter = FILTERS.MARVIN.CSS_FILTER + '(' + value + '%' + ')';
          break;
        }

        case FILTERS.PHOBOS.NAME: {
          effectImagePreview.style.filter = FILTERS.PHOBOS.CSS_FILTER + '(' + value * 3 / 100 + 'px' + ')';
          break;
        }

        case FILTERS.HEAT.NAME: {
          effectImagePreview.style.filter = FILTERS.HEAT.CSS_FILTER + '(' + value * 3 / 100 + ')';
          break;
        }
      }
    }
  };
})();
