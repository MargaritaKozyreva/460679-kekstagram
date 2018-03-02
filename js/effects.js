'use strict';
(function () {
  var uploadForm = document.querySelector('#upload-select-image');
  var uploadEffectLevel = uploadForm.querySelector('.upload-effect-level');
  var uploadEffectLevelLine = uploadForm.querySelector('.upload-effect-level-line');
  var uploadLevelPin = uploadForm.querySelector('.upload-effect-level-pin');
  var uploadLevelVal = uploadForm.querySelector('.upload-effect-level-val');

  uploadLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
    };

    function onMouseMove(moveEvt) {
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
        uploadLevelVal.value = newCoords / newCoordsPercent;
        window.filters.setLevelEffect(uploadLevelVal.value);
      }
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  uploadEffectLevel.style.display = 'none';

  window.effects = {

    filterChange: function (value) {
      if (value === 'none') {
        uploadEffectLevel.style.display = 'none';
      } else {
        uploadEffectLevel.style.display = 'block';
      }
    },

    resetSlider: function (value) {
      uploadLevelPin.style.left = value;
      uploadLevelVal.style.width = value;
    }
  };
})();
