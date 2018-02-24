// валидация формы

'use strict';

(function () {
  var uploadForm = document.querySelector('#upload-select-image');
  var uploadFormHashtags = uploadForm.querySelector('.upload-form-hashtags');
  var uploadFormDesc = uploadForm.querySelector('.upload-form-description');
  var uploadEffectLevel = uploadForm.querySelector('.upload-effect-level');
  var effectImagePreview = uploadForm.querySelector('.effect-image-preview');
  var uploadFormOverlay = uploadForm.querySelector('.upload-overlay');
  var uploadMessage = uploadForm.querySelector('.upload-message');
  var closeUploadFormButton = uploadForm.querySelector('.upload-form-cancel');
  var ESC_СODE = 27;

  closeUploadFormButton.addEventListener('click', function () {
    photoClear();
    formClear();
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_СODE) {
      photoClear();
      formClear();
    }
  });

  function setValidDescriptionInput() {
    uploadFormDesc.setCustomValidity('');
    uploadFormDesc.style.outline = '';
  }

  function checkInvalidDescriptionInput() {
    if (uploadFormDesc.validity.tooLong) {
      uploadFormDesc.setCustomValidity('длина комментария не может составлять больше 140 символов');
      uploadFormDesc.style.outline = '2px solid red';
    }
  }

  function setValidHashtagsInput() {
    uploadFormHashtags.style.outline = '';
    uploadFormHashtags.setCustomValidity('');
  }

  function photoClear() {
    uploadEffectLevel.style.display = 'none';
    effectImagePreview.style.filter = 'none';
    uploadFormOverlay.classList.add('hidden');
    uploadMessage.classList.add('hidden');
  }

  function formClear() {
    setValidHashtagsInput();
    setValidDescriptionInput();
    uploadForm.reset();
  }

  var invalidityText;
  var hashtagValue;

  function checkValidHashtagsInput() {

    hashtagValue = uploadFormHashtags.value.trim();

    if (hashtagValue) {
      var hashtagsArray = hashtagValue.split(' ').filter(function (hashtag) {
        return hashtag.length !== 0;
      });

      invalidityText = '';

      for (var x = 0; x < hashtagsArray.length; x++) {
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
    evt.preventDefault();
    invalidityText = '';

    checkValidHashtagsInput();
    checkInvalidDescriptionInput();

    if (!invalidityText) {
      setValidDescriptionInput();
      uploadFormOverlay.classList.add('hidden');
      uploadMessage.classList.add('hidden');
      uploadForm.reset();
    }
  });
})();
