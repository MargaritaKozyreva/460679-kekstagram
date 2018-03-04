'use strict';

(function () {

  var STEP_CHANGE = window.CONSTANTS.STEP_CHANGE;
  var uploadForm = document.querySelector('#upload-select-image');
  var resizeDecButton = uploadForm.querySelector('.upload-resize-controls-button-dec');
  var resizeIncButton = uploadForm.querySelector('.upload-resize-controls-button-inc');
  var uploadResizeValue = uploadForm.querySelector('.upload-resize-controls-value');
  var effectImagePreview = uploadForm.querySelector('.effect-image-preview');

  function resizeButtonHandler(evt) {
    var uploadNumber = parseInt(uploadResizeValue.value, 10);
    var type = evt.target.dataset.type;

    if (type === 'dec' && uploadNumber > STEP_CHANGE && uploadNumber <= 100) {
      uploadNumber = uploadNumber - STEP_CHANGE;
    } else if (type === 'inc' && uploadNumber >= STEP_CHANGE && uploadNumber < 100) {
      uploadNumber = uploadNumber + STEP_CHANGE;
    }
    uploadResizeValue.value = uploadNumber + '%';
    effectImagePreview.style.transform = 'scale(' + uploadNumber / 100 + ')';
  }

  resizeDecButton.addEventListener('click', resizeButtonHandler);
  resizeIncButton.addEventListener('click', resizeButtonHandler);

})();
