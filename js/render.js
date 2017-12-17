'use strict';

(function () {
  var WIZARDS_COUNT = 4;
  var similar = document.querySelector('.setup-similar');
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  // Render single wizard
  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    var wizardCoat = wizardElement.querySelector('.wizard-coat');
    var wizardEyes = wizardElement.querySelector('.wizard-eyes');
    var wizardName = wizardElement.querySelector('.setup-similar-label');

    wizardName.textContent = wizard.name;
    window.colorizeElement(wizardCoat, wizard.colorCoat, window.util.fillElement);
    window.colorizeElement(wizardEyes, wizard.colorEyes, window.util.fillElement);

    return wizardElement;
  };

  window.render = function (data) {
    var takeNumber = data.length > WIZARDS_COUNT ? WIZARDS_COUNT : data.length;
    similarListElement.innerHTML = '';

    for (var i = 0; i < takeNumber; i++) {
      similarListElement.appendChild(renderWizard(data[i]));
    }

    similar.classList.remove('hidden');
  };
})();
