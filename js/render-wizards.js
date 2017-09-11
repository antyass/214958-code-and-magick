'use strict';

window.renderWizards = (function () {

  var setup = document.querySelector('.setup');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
  var similarList = document.querySelector('.setup-similar-list');

  /**
   * Создаёт DOM-элемент на основе JS-объекта
   * @param {WizardData} wizard
   * @return {DocumentFragment}
   */
  var renderWizard = function (wizard) {
    var element = similarWizardTemplate.cloneNode(true);
    var wizardElement = element.querySelector('.wizard');

    element.querySelector('.setup-similar-label').textContent = wizard.name;
    element.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    element.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    window.artifacts.openPopup(wizardElement, function () {
      return renderWizardArtifacts(wizard);
    });

    return element;
  };

  /**
   * Отрисовывает волшебников
   * @param {Array.<WizardData>} data
   */
  var render = function (data) {
    var number = data.length > 4 ? 4 : data.length;
    var fragment = window.util.getFragment(data.slice(0, number), renderWizard);
    similarList.innerHTML = '';
    similarList.appendChild(fragment);
    setup.querySelector('.setup-similar').classList.remove('hidden');
  };

  var renderWizardArtifacts = function (wizard) {
    var list = document.createElement('dl');

    var artifacts = wizard.artifacts.map(function (it) {
      var content = document.createElement('div');
      var term = document.createElement('dt');
      var description = document.createElement('dd');
      term.textContent = it.name;
      description.textContent = it.description;
      content.appendChild(term);
      content.appendChild(description);
      return content;
    });

    artifacts.forEach(function (artifact) {
      list.appendChild(artifact);
    });

    return list;
  };

  return {
    render: render
  };

})();
