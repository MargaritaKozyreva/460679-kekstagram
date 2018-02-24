'use strict';

// 4 задание

var uploadForm = document.querySelector('#upload-select-image');
var uploadFile = uploadForm.querySelector('#upload-file');
var effectImagePreview = uploadForm.querySelector('.effect-image-preview');
var uploadFormOverlay = document.querySelector('.upload-overlay');
var uploadMessage = document.querySelector('.upload-message');

uploadFile.addEventListener('change', function () {
  uploadFormOverlay.classList.remove('hidden');
  uploadMessage.classList.remove('hidden');
  effectImagePreview.style.transform = 'scale(1)';
});


