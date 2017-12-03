'use strict';

(function () {
  var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  // Wizard
  var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
  var fireball = document.querySelector('.setup-fireball-wrap');

  // Change wizard coat color on click
  wizardCoat.addEventListener('click', function () {
    wizardCoat.style.fill = window.util.getRandomIntArr(WIZARD_COAT_COLORS);
  });

  // Change wizard eyes color on click
  wizardEyes.addEventListener('click', function () {
    wizardEyes.style.fill = window.util.getRandomIntArr(WIZARD_EYES_COLORS);
  });

  // Change fireball color on click
  fireball.addEventListener('click', function () {
    fireball.style.backgroundColor = window.util.getRandomIntArr(FIREBALL_COLORS);
  });

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  // Generate various wizards
  var generateWizards = function (firstNames, lastNames, coatColors, eyesColors) {
    var wizards = [];
    var firstNamesLength = firstNames.length - 1;
    var lastNamesLength = lastNames.length - 1;
    var coatColorsLength = coatColors.length - 1;
    var eyesColorsLength = eyesColors.length - 1;

    for (var i = 0; i < 4; i++) {
      wizards[i] = {
        name: firstNames[window.util.getRandomInt(0, firstNamesLength)] + ' ' + lastNames[window.util.getRandomInt(0, lastNamesLength)],
        coatColor: coatColors[window.util.getRandomInt(0, coatColorsLength)],
        eyesColor: eyesColors[window.util.getRandomInt(0, eyesColorsLength)]
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

    document.querySelector('.setup-similar').classList.remove('hidden');

    return target.appendChild(fragment);
  };

  // Output wizards
  getSimilarWizard(wizards, similarListElement);


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

})();
