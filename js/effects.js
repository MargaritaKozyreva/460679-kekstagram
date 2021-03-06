'use strict';

(function () {

  var uploadEffectLevel = document.querySelector('.upload-effect-level');
  var uploadEffectLevelLine = document.querySelector('.upload-effect-level-line');
  var uploadLevelPin = document.querySelector('.upload-effect-level-pin');
  var uploadLevelScale = document.querySelector('.upload-effect-level-val');
  var uploadLevelValue = document.querySelector('.upload-effect-level-value');

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
        uploadLevelScale.style.width = newCoords / newCoordsPercent + '%';
        uploadLevelScale.value = parseInt(uploadLevelScale.style.width, 10);
        uploadLevelValue.setAttribute('value', parseInt(uploadLevelScale.value, 10));
        window.filters.setLevelEffect(uploadLevelValue.value);
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

    switchSliderDisplay: function (value) {
      if (value === 'none') {
        uploadEffectLevel.style.display = 'none';
      } else {
        uploadEffectLevel.style.display = 'block';
      }
    },

    resetSlider: function (value) {
      uploadLevelPin.style.left = value;
      uploadLevelScale.style.width = value;
      uploadLevelValue.setAttribute('value', parseInt(value, 10));
    }
  };
})();
