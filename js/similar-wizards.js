'use strict';

(function () {

  var wizards = [];

  /**
   * Получает и обновляет список волшебников
   * @param {Array.<WizardData>} data
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
   * Ранжирует волшебников в соответствии с цветом плаща и глаз
   * @param {WizardData} wizard
   * @return {number}
   */
  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === window.myWizard.coatColor) {
      rank += 2;
    }

    if (wizard.colorEyes === window.myWizard.eyesColor) {
      rank += 1;
    }

    return rank;
  };

  /**
   * Позволяет обновить похожих волшебников при изменении волшебника
   */
  window.myWizard.onChange = function () {
    refreshWizards();
  };

  window.backend.load(successHandler, window.util.errorHandler);

})();
