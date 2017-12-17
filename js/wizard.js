'use strict';
(function () {
  var COAT_COLORS = [
    'rgb(146, 100, 161)',
    'rgb(215, 210, 55)',
    'rgb(241, 43, 107)',
    'rgb(101, 137, 164)',
    'rgb(0, 0, 0)',
    'rgb(215, 210, 55)',
    'rgb(56, 159, 117)',
    'rgb(241, 43, 107)'
  ];

  var EYES_COLORS = [
    'red',
    'orange',
    'yellow',
    'green',
    'lightblue',
    'blue',
    'purple'
  ];

  var FIREBALL_COLORS = [
    '#ee4830',
    '#30a8ee',
    '#5ce6c0',
    '#e848d5',
    '#e6e848'
  ];

  // Wizard and his parts
  var wizardElement = document.querySelector('.setup-wizard');
  var wizardCoatElement = wizardElement.querySelector('.wizard-coat');
  var wizardEyesElement = wizardElement.querySelector('.wizard-eyes');
  var wizardFireball = document.querySelector('.setup-fireball-wrap');

  var onDialogChangeWizardCoatColor = function () {
    var newColor = window.util.getRandomIntArr(COAT_COLORS);
    window.colorizeElement(wizardCoatElement, newColor, window.util.fillElement);
    window.wizard.onCoatChange(newColor);
  };

  var onDialogChangeWizardEyesColor = function () {
    var newColor = window.util.getRandomIntArr(EYES_COLORS);
    window.colorizeElement(wizardEyesElement, newColor, window.util.fillElement);
    window.wizard.onEyesChange(newColor);
  };

  var onDialogChangeWizardFireballColor = function () {
    var newColor = window.util.getRandomIntArr(FIREBALL_COLORS);
    window.colorizeElement(wizardFireball, newColor, window.util.changeElementBackground);
  };

  wizardCoatElement.addEventListener('click', onDialogChangeWizardCoatColor);
  wizardEyesElement.addEventListener('click', onDialogChangeWizardEyesColor);
  wizardFireball.addEventListener('click', onDialogChangeWizardFireballColor);
})();
