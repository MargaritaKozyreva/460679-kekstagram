'use strict';
(function () {

  var uploadForm = document.querySelector('#upload-select-image');
  var uploadEffect = uploadForm.querySelector('.upload-effect-controls');
  var effectImagePreview = uploadForm.querySelector('.effect-image-preview');

  var filterValue = 'none';

  var changeFilter = function (evt) {
    var target = evt.target;
    if (target.type === 'radio') {
      var filter = evt.target.value;
      clearFilter(filter);
    }
  };

  var clearFilter = function (filter) {
    effectImagePreview.classList = '';
    effectImagePreview.style = '';
    effectImagePreview.style.filter = '';
    effectImagePreview.classList.add('effect-' + filter);
    filterValue = filter;
  };

  uploadEffect.addEventListener('click', changeFilter);

  var setLevelEffect = function (val) {
    switch (filterValue) {
      case 'chrome': effectImagePreview.style.filter = 'grayscale(' + val / 100 + ')'; break;
      case 'sepia': effectImagePreview.style.filter = 'sepia(' + val / 100 + ')'; break;
      case 'marvin': effectImagePreview.style.filter = 'invert(' + val + '%' + ')'; break;
      case 'phobos': effectImagePreview.style.filter = 'blur(' + val * 3 / 100 + 'px' + ')'; break;
      case 'heat': effectImagePreview.style.filter = 'brightness(' + val * 3 / 100 + ')'; break;
    }
  };
  setLevelEffect();
})();
