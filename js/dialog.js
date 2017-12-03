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
  });

  userDialogClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, function () {
      closeUserDialog();
    });
  });


})();
