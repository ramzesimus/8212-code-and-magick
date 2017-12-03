'use strict';

(function () {
  // User Dialog
  var userDialog = document.querySelector('.setup');
  var userDialogOpen = document.querySelector('.setup-open');
  var userDialogClose = userDialog.querySelector('.setup-close');
  var userDialogName = userDialog.querySelector('.setup-user-name');

  // Open User Dialog popup on click
  var openUserDialog = function () {
    userDialog.classList.remove('hidden');

    // add listener on Escape key
    document.addEventListener('keydown', onUserDialogEscPress);
  };

  // Close User Dialog popup on click
  var closeUserDialog = function () {
    userDialog.classList.add('hidden');

    // remove listener on Escape key
    document.removeEventListener('keydown', onUserDialogEscPress);
  };

  // Close User Dialog on Escape key
  var onUserDialogEscPress = function (evt) {
    window.util.isEscEvent(evt, function () {
      if (evt.target !== userDialogName) {
        closeUserDialog();
      }
    });
  };

  userDialogOpen.addEventListener('click', function () {
    openUserDialog();
  });

  userDialogOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, function () {
      openUserDialog();
    });
  });

  userDialogClose.addEventListener('click', function () {
    closeUserDialog();
    userDialog.style = '';
  });

  userDialogClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, function () {
      closeUserDialog();
      userDialog.style = '';
    });
  });

  // Allows to drag Dialog Popup
  var userDialogHandle = userDialog.querySelector('.setup-user-pic');
  // fixes issue with type input that overlaps avatar
  userDialogHandle.style.zIndex = 1;

  userDialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      userDialog.style.top = (userDialog.offsetTop - shift.y) + 'px';
      userDialog.style.left = (userDialog.offsetLeft - shift.x) + 'px';

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('moveup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
