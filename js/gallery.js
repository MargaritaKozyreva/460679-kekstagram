'use strict';

(function () {

  var gallery = document.querySelector('.gallery-overlay');
  var galleryPreview = document.querySelector('.gallery-overlay-image');
  var galleryLikes = document.querySelector('.gallery-overlay-controls-like > .likes-count');
  var galleryComments = document.querySelector('.gallery-overlay-controls-comments > .comments-count');
  var galleryClose = document.querySelector('.gallery-overlay-close');
  var picturesContainer = document.querySelector('.pictures');

  picturesContainer.addEventListener('click', function (evt) {
    evt.preventDefault();

    var target = evt.target;

    while (target !== picturesContainer) {
      if (target.className === 'picture') {
        galleryPreview.src = target.querySelector('img').src;
        galleryLikes.textContent = target.querySelector('.picture-likes').textContent;
        galleryComments.textContent = target.querySelector('.picture-comments').textContent;
        gallery.classList.remove('hidden');

        return;
      }
      target = target.parentNode;
    }
  });

  function photoClear() {
    gallery.classList.add('hidden');
  }

  galleryClose.addEventListener('click', function () {
    photoClear();
  });

  function closeUploadFromEsc(evt) {
    window.util.isEscEvent(evt, photoClear);
  }

  document.addEventListener('keydown', closeUploadFromEsc);
})();
