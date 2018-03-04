'use strict';

(function () {

  var uploadForm = document.querySelector('#upload-select-image');
  var uploadFormHashtags = uploadForm.querySelector('.upload-form-hashtags');
  var uploadFormDescription = uploadForm.querySelector('.upload-form-description');
  var uploadEffectLevel = uploadForm.querySelector('.upload-effect-level');
  var effectImagePreview = uploadForm.querySelector('.effect-image-preview');
  var uploadFormOverlay = uploadForm.querySelector('.upload-overlay');
  var uploadMessage = uploadForm.querySelector('.upload-message');
  var uploadFormCancel = uploadForm.querySelector('.upload-form-cancel');

  function onEscPress(evt) {
    window.CONSTANTS.isEscEvent(evt, closeUploadForm);
  }

  document.addEventListener('keydown', onEscPress);

  uploadFormCancel.addEventListener('click', function () {
    closeUploadForm();
    document.removeEventListener('keydown', onEscPress);
  });

  function setValidDescriptionInput() {
    uploadFormDescription.style.outline = '';
    uploadFormDescription.setCustomValidity('');
  }

  function checkInvalidDescriptionInput() {
    if (uploadFormDescription.validity.tooLong) {
      uploadFormDescription.setCustomValidity('длина комментария не может составлять больше 140 символов');
      uploadFormDescription.style.outline = '2px solid red';
    }
  }

  function setValidHashtagsInput() {
    uploadFormHashtags.style.outline = '';
    uploadFormHashtags.setCustomValidity('');
  }

  function imageClear() {
    uploadEffectLevel.style.display = 'none';
    effectImagePreview.style.filter = 'none';
    uploadFormOverlay.classList.add('hidden');
    uploadMessage.classList.add('hidden');
  }

  function inputClear() {
    setValidHashtagsInput();
    setValidDescriptionInput();
    uploadForm.reset();
  }

  function closeUploadForm() {
    imageClear();
    inputClear();
  }

  var invalidityText;
  var hashtagValue;

  function checkValidHashtagsInput() {

    hashtagValue = uploadFormHashtags.value.trim();
    hashtagValue = hashtagValue.toLowerCase();
    invalidityText = '';

    if (hashtagValue) {
      var hashtagsArray = hashtagValue.split(' ');

      for (var x = 0; x < hashtagsArray.length && hashtagsArray !== ''; x++) {
        if (hashtagsArray[x].length === 1) {
          invalidityText = 'Хэш-тег не должен быть пустым';
        } else if (hashtagsArray[x].indexOf('#') !== 0) {
          invalidityText = 'Хэш-тег начинается с символа # (решётка) и состоит из одного слова';
        } else if (hashtagsArray.indexOf(hashtagsArray[x]) !== x) {
          invalidityText = 'Один и тот же хэш-тег не может быть использован дважды';
        } else if (hashtagsArray[x].split('#').length > 2) {
          invalidityText = 'Хэш-теги должны разделяться пробелами';
        } else if (hashtagsArray[x].length > 21) { // учитываем #
          invalidityText = 'Максимальная длина одного хэш-тега 20 символов';
        } else if (hashtagsArray.length > 5) {
          invalidityText = 'Вы не должны указать больше пяти (5) хэш-тегов';
        }

        if (invalidityText !== '') {
          uploadFormHashtags.style.outline = '2px solid red';
          uploadFormHashtags.setCustomValidity(invalidityText);
          return;
        }

      }
    }
    setValidHashtagsInput();
  }

  uploadFormHashtags.addEventListener('input', checkValidHashtagsInput, false);

  uploadForm.addEventListener('submit', function (evt) {
    var data = new FormData(uploadForm);

    if (!invalidityText) {
      closeUploadForm();
      window.backend.upload(data, window.backend.onLoad, window.backend.onError);
      setValidDescriptionInput();
    }

    evt.preventDefault();
    invalidityText = '';
    checkValidHashtagsInput();
    checkInvalidDescriptionInput();
  });
})();
