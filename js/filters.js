'use strict';

(function () {

  var FILTERS = window.CONSTANTS.CSS_FILTERS;
<<<<<<< HEAD
  var STEP_CHANGE = window.CONSTANTS.STEP_CHANGE;
  var resizeDecButton = document.querySelector('.upload-resize-controls-button-dec');
  var resizeIncButton = document.querySelector('.upload-resize-controls-button-inc');
  var resizeValue = document.querySelector('.upload-resize-controls-value');
  var uploadEffect = document.querySelector('.upload-effect-controls');
  var effectImagePreview = document.querySelector('.effect-image-preview');

  function resizeButtonHandler(evt) {
    var uploadNumber = parseInt(resizeValue.value, 10);
    var type = evt.target.dataset.type;

    if (type === 'dec' && uploadNumber > STEP_CHANGE && uploadNumber <= 100) {
      uploadNumber = uploadNumber - STEP_CHANGE;
    } else if (type === 'inc' && uploadNumber >= STEP_CHANGE && uploadNumber < 100) {
      uploadNumber = uploadNumber + STEP_CHANGE;
    }
    resizeValue.value = uploadNumber + '%';
    effectImagePreview.style.transform = 'scale(' + uploadNumber / 100 + ')';
  }
=======
  var uploadForm = document.querySelector('#upload-select-image');
  var uploadEffect = uploadForm.querySelector('.upload-effect-controls');
  var effectImagePreview = uploadForm.querySelector('.effect-image-preview');
>>>>>>> cf80999677006c89edd9b683084c794ccf068266

  resizeDecButton.addEventListener('click', resizeButtonHandler);
  resizeIncButton.addEventListener('click', resizeButtonHandler);

  function setValue(evt) {
    var target = evt.target;
    if (target.type === 'radio') {
      var filter = evt.target.value;
      window.effects.switchSliderDisplay(filter);
      setFilter(filter);
    }
  }

<<<<<<< HEAD
  var currentFilter;

  function setFilter(filterName) {

    resizeValue.value = '100%';
    window.effects.resetSlider('100%');
    effectImagePreview.style.transform = 'scale(1)';

    if (currentFilter) {
      effectImagePreview.classList.remove('effect-' + currentFilter);
    }
    effectImagePreview.classList.add('effect-' + filterName);
    effectImagePreview.style.filter = '';

    currentFilter = filterName;

=======
  function setFilter(filter) {
    effectImagePreview.classList = '';
    effectImagePreview.style = '';
    effectImagePreview.style.filter = '';
    effectImagePreview.classList.add('effect-' + filter);
    window.effects.resetSlider('100%');
    filterValue = filter;
>>>>>>> cf80999677006c89edd9b683084c794ccf068266
  }

  uploadEffect.addEventListener('click', setValue);

  window.filters = {
    setLevelEffect: function (value) {
      switch (currentFilter) {

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
