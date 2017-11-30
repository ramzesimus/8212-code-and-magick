'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

// User Dialog
var userDialog = document.querySelector('.setup');
var userDialogOpen = document.querySelector('.setup-open');
var userDialogClose = userDialog.querySelector('.setup-close');
var userDialogName = userDialog.querySelector('.setup-user-name');

// Wizard
var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
var fireball = document.querySelector('.setup-fireball-wrap');

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
var onUserDialogEscPress = function (e) {
  if (e.keyCode === ESC_KEYCODE && e.target !== userDialogName) {
    closeUserDialog();
  }
};

userDialogOpen.addEventListener('click', function () {
  openUserDialog();
});

userDialogOpen.addEventListener('keydown', function (e) {
  if (e.keyCode === ENTER_KEYCODE) {
    openUserDialog();
  }
});

userDialogClose.addEventListener('click', function () {
  closeUserDialog();
});

userDialogClose.addEventListener('keydown', function (e) {
  if (e.keyCode === ENTER_KEYCODE) {
    closeUserDialog();
  }
});

// Change wizard coat color on click
wizardCoat.addEventListener('click', function () {
  wizardCoat.style.fill = getRandomIntArr(WIZARD_COAT_COLORS);
});

// Change wizard eyes color on click
wizardEyes.addEventListener('click', function () {
  wizardEyes.style.fill = getRandomIntArr(WIZARD_EYES_COLORS);
});

// Change fireball color on click
fireball.addEventListener('click', function () {
  fireball.style.backgroundColor = getRandomIntArr(FIREBALL_COLORS);
});


var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

// Get random number
var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Get random number in array
var getRandomIntArr = function (arr) {
  return arr[getRandomInt(0, arr.length - 1)];
};

// Generate various wizards
var generateWizards = function (firstNames, lastNames, coatColors, eyesColors) {
  var wizards = [];
  var firstNamesLength = firstNames.length - 1;
  var lastNamesLength = lastNames.length - 1;
  var coatColorsLength = coatColors.length - 1;
  var eyesColorsLength = eyesColors.length - 1;

  for (var i = 0; i < 4; i++) {
    wizards[i] = {
      name: firstNames[getRandomInt(0, firstNamesLength)] + ' ' + lastNames[getRandomInt(0, lastNamesLength)],
      coatColor: coatColors[getRandomInt(0, coatColorsLength)],
      eyesColor: eyesColors[getRandomInt(0, eyesColorsLength)]
    };
  }
  return wizards;
};

// Generate wizards object
var wizards = generateWizards(WIZARD_NAMES, WIZARD_SURNAMES, WIZARD_COAT_COLORS, WIZARD_EYES_COLORS);

// Render single wizard
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

// Get similar wizards and display wizards section
var getSimilarWizard = function (wizardsArr, target) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < wizardsArr.length; i++) {
    fragment.appendChild(renderWizard(wizardsArr[i]));
  }

  userDialog.querySelector('.setup-similar').classList.remove('hidden');

  return target.appendChild(fragment);
};

// Output wizards
getSimilarWizard(wizards, similarListElement);
