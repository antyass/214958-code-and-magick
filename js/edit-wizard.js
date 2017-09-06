'use strict';

(function () {
  var WIZARD_PROPERTIES = {
    COAT_COLORS: ['rgb(146, 100, 161)', 'rgb(215, 210, 55)', 'rgb(241, 43, 107)', 'rgb(101, 137, 164)', 'rgb(0, 0, 0)', 'rgb(215, 210, 55)', 'rgb(56, 159, 117)', 'rgb(241, 43, 107)'],
    EYES_COLORS: ['red', 'orange', 'yellow', 'green', 'lightblue', 'blue', 'purple'],
    FIREBALL_COLORS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
  };

  var setup = document.querySelector('.setup');
  var wizardCoat = setup.querySelector('.wizard-coat');
  var wizardEyes = setup.querySelector('.wizard-eyes');
  var fireballWrap = setup.querySelector('.setup-fireball-wrap');

  var fillWizardEyes = function (element, color) {
    element.style.fill = color;
    window.wizards.eyesChangeHandler(color);
  };

  var fillWizardCoat = function (element, color) {
    element.style.fill = color;
    window.wizards.coatChangeHandler(color);
  };

  var changeElementBackground = function (element, color) {
    element.style.backgroundColor = color;
  };

  window.colorizeElement(wizardCoat, WIZARD_PROPERTIES.COAT_COLORS, fillWizardCoat);
  window.colorizeElement(wizardEyes, WIZARD_PROPERTIES.EYES_COLORS, fillWizardEyes);
  window.colorizeElement(fireballWrap, WIZARD_PROPERTIES.FIREBALL_COLORS, changeElementBackground);

})();
