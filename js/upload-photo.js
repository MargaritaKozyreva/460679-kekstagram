'use strict';

(function () {

  var uploadFile = document.querySelector('#upload-file');
  var effectImagePreview = document.querySelector('.effect-image-preview');
  var uploadFormOverlay = document.querySelector('.upload-overlay');
  var uploadMessage = document.querySelector('.upload-message');
  var uploadLevelValue = document.querySelector('.upload-effect-level-value');

  uploadFile.addEventListener('change', function () {
    uploadFormOverlay.classList.remove('hidden');
    uploadMessage.classList.remove('hidden');
    uploadLevelValue.removeAttribute('value');
    effectImagePreview.style.transform = 'scale(1)';
  });

})();
