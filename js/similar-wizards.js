'use strict';

(function () {
  /**
   * Объект-маг
   * @typedef {object} Wizard
   * @property {string} name - Имя волшебника
   * @property {string} coatColor - Цвет мантии
   * @property {string} eyesColor - Цвет глаз
   */

  /**
   * Создаёт DOM-элемент на основе JS-объекта
   * @param {Wizard} wizard
   * @return {DocumentFragment}
   */
  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var setup = document.querySelector('.setup');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
  var similarList = document.querySelector('.setup-similar-list');

  var successHandler = function (wizards) {
    var fragment = window.util.getFragment(wizards.slice(0, 4), renderWizard);
    similarList.appendChild(fragment);
    setup.querySelector('.setup-similar').classList.remove('hidden');
  };

  window.backend.load(successHandler, window.util.errorHandler);
})();
