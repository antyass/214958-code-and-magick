'use strict';

window.renderWizards = (function () {

  var setup = document.querySelector('.setup');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
  var similarList = document.querySelector('.setup-similar-list');

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

  /**
   * Отрисовывает волшебников
   * @param {Array.<Wizard>} data
   */
  var render = function (data) {
    var number = data.length > 4 ? 4 : data.length;
    var fragment = window.util.getFragment(data.slice(0, number), renderWizard);
    similarList.innerHTML = '';
    similarList.appendChild(fragment);
    setup.querySelector('.setup-similar').classList.remove('hidden');
  };

  return {
    render: render
  };

})();
