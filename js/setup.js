'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

// Get random number
var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
