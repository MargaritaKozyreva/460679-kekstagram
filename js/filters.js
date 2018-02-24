'use strict';
(function () {
  var uploadForm = document.querySelector('#upload-select-image');
  var effectImagePreview = uploadForm.querySelector('.effect-image-preview');
  var uploadEffect = uploadForm.querySelectorAll('[name="effect"]');
  var uploadEffectLevel = uploadForm.querySelector('.upload-effect-level');
  var uploadEffectLevelLine = uploadForm.querySelector('.upload-effect-level-line');
  var uploadLevelPin = uploadForm.querySelector('.upload-effect-level-pin');
  var uploadLevelValue = uploadForm.querySelector('.upload-effect-level-value');
  var uploadLevelVal = uploadForm.querySelector('.upload-effect-level-val');

  var filterValue = 'none';

  uploadEffectLevel.style.display = 'none';
  for (var i = 0; i < uploadEffect.length; i++) {
    uploadEffect[i].addEventListener('click', function (evt) {
      for (var j = 0; j < uploadEffect.length; j++) {
        effectImagePreview.classList.remove('effect-' + uploadEffect[j].value);
      }
      uploadEffectLevel.style.display = 'block';
      effectImagePreview.classList.add('effect-' + evt.target.value);
      filterValue = evt.target.value;
      if (filterValue === 'none') {
        uploadEffectLevel.style.display = 'none';
      }
      uploadLevelPin.style.left = '100%';
      uploadLevelVal.style.width = '100%';
      effectImagePreview.style.filter = '';
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
          case 'chrome': effectImagePreview.style.filter = 'grayscale(' + uploadLevelValue.value / 100 + ')'; break;
          case 'sepia': effectImagePreview.style.filter = 'sepia(' + uploadLevelValue.value / 100 + ')'; break;
          case 'marvin': effectImagePreview.style.filter = 'invert(' + uploadLevelValue.value + '%' + ')'; break;
          case 'phobos': effectImagePreview.style.filter = 'blur(' + uploadLevelValue.value * 3 / 100 + 'px' + ')'; break;
          case 'heat': effectImagePreview.style.filter = 'brightness(' + uploadLevelValue.value * 3 / 100 + ')'; break;
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
})();
