'use strict';

(function () {

  // Shop & Artifacts
  var shopElement = document.querySelector('.setup-artifacts-shop');
  var draggedItem = null;
  var artifactsElement = document.querySelector('.setup-artifacts');

  // Star dragging
  shopElement.addEventListener('dragstart', function (evt) {
    // check if it's image element
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);

      // add outline on element where we suppose to drop
      artifactsElement.style.outline = '2px dashed red';
    }
  });

  artifactsElement.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  // add yellow background when we're above cell
  artifactsElement.addEventListener('dragenter', function (evt) {
    evt.preventDefault();
    if (evt.target.classList.contains('setup-artifacts-cell') && evt.target.innerHTML === '') {
      evt.target.style.backgroundColor = 'yellow';
    }
  });

  // drop dragend item
  artifactsElement.addEventListener('drop', function (evt) {
    evt.preventDefault();
    artifactsElement.style = '';

    if (evt.target.classList.contains('setup-artifacts-cell') && evt.target.innerHTML === '') {
      evt.target.appendChild(draggedItem.cloneNode(true));
      evt.target.style.backgroundColor = '';
    }
  });

  artifactsElement.addEventListener('dragleave', function (evt) {
    evt.preventDefault();
    if (evt.target.classList.contains('setup-artifacts-cell')) {
      evt.target.style.backgroundColor = '';
    }
  });

  // remove styling on artifacts element whether it was successful or not
  shopElement.addEventListener('dragend', function () {
    artifactsElement.style = '';
  });

  // Upload data on server
  var form = document.querySelector('.setup-wizard-form');
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), window.backend.onSuccess, window.backend.errorHandler);
  });

})();
