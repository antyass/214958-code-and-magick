'use strict';

window.wizards = (function () {

  /**
   * Объект-маг
   * @typedef {object} Wizard
   * @property {string} name - Имя волшебника
   * @property {string} coatColor - Цвет мантии
   * @property {string} eyesColor - Цвет глаз
   */

  var wizards = [];
  var coatColor;
  var eyesColor;

  /**
   * Получает и обновляет список волшебников
   * @param {Array.<Wizard>} data
   */
  var successHandler = function (data) {
    wizards = data;
    updateWizards();
  };

  /**
   * Обновляет список волшебников
   */
  var updateWizards = function () {
    window.renderWizards.render(wizards.slice().sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = wizards.indexOf(left) - wizards.indexOf(right);
      }
      return rankDiff;
    }));
  };

  var refreshWizards = window.util.debounce(updateWizards);

  /**
   * Обрабатывает изменение цвета глаз волшебника
   * @param {eyesColor} color
   */
  var eyesChangeHandler = function (color) {
    eyesColor = color;
    refreshWizards();
  };

  /**
   * Обрабатывает изменение цвета плаща волшебника
   * @param {coatColor} color
   */
  var coatChangeHandler = function (color) {
    coatColor = color;
    refreshWizards();
  };

  /**
   * Ранжирует волшебников в соответствии с цветом плаща и глаз
   * @param {Wizard} wizard
   * @return {number}
   */
  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }

    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  window.backend.load(successHandler, window.util.errorHandler);

  return {
    eyesChangeHandler: eyesChangeHandler,
    coatChangeHandler: coatChangeHandler
  };

})();
