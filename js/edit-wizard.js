'use strict';

(function () {
  var WIZARD_PROPERTIES = {
    COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],
    FIREBALL_COLORS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
  };

  var setup = document.querySelector('.setup');
  var wizardCoat = setup.querySelector('.wizard-coat');
  var wizardEyes = setup.querySelector('.wizard-eyes');
  var fireballWrap = setup.querySelector('.setup-fireball-wrap');

  var fillElement = function (element, color) {
    element.style.fill = color;
  };

  var changeElementBackground = function (element, color) {
    element.style.backgroundColor = color;
  };

  window.colorizeElement(wizardCoat, WIZARD_PROPERTIES.COAT_COLORS, fillElement);
  window.colorizeElement(wizardEyes, WIZARD_PROPERTIES.EYES_COLORS, fillElement);
  window.colorizeElement(fireballWrap, WIZARD_PROPERTIES.FIREBALL_COLORS, changeElementBackground);

})();
