'use strict';

(function () {
  var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var WIZARDS_COUNT = 4;

  // Wizard
  var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
  var fireball = document.querySelector('.setup-fireball-wrap');

  // Colorize wizard coat color on click
  window.colorizeElement(wizardCoat, WIZARD_COAT_COLORS, window.util.fillElement);

  // Colorize wizard eyes color on click
  window.colorizeElement(wizardEyes, WIZARD_EYES_COLORS, window.util.fillElement);

  // Colorize fireball color on click
  window.colorizeElement(fireball, FIREBALL_COLORS, window.util.changeElementBackground);

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  // Render single wizard
  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

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


  var userDialog = document.querySelector('.setup');
  var form = document.querySelector('.setup-wizard-form');

  // On Form Submit Success
  var onSuccess = function () {
    var formAlert = document.querySelector('form-alert');
    if (formAlert) {
      formAlert.classList.add('hidden');
    }
    userDialog.classList.add('hidden');
  };

  // On Form Submit Error
  var errorHandler = function (alertMessage) {
    var node = document.createElement('div');

    node.className = 'form-alert';

    node.textContent = alertMessage;
    document.body.insertAdjacentElement('afterbegin', node);

    setTimeout(function () {
      node.classList.add('form-alert--show');
    }, 100);
  };

  // Get wizards
  var successHandler = function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < WIZARDS_COUNT; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);

    userDialog.querySelector('.setup-similar').classList.remove('hidden');
  };

  // Upload data on server
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), onSuccess, errorHandler);
  });

  // Set wizards
  window.backend.load(successHandler, errorHandler);

})();
