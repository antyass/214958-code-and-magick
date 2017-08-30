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
  var fireballColor;

  wizardCoat.addEventListener('click', function () {
    var current = WIZARD_PROPERTIES.COAT_COLORS.indexOf(wizardCoat.style.fill);
    var currentNumber = current !== -1 ? current : 0;
    wizardCoat.style.fill = WIZARD_PROPERTIES.COAT_COLORS[(++currentNumber) % WIZARD_PROPERTIES.COAT_COLORS.length];
  });

  wizardEyes.addEventListener('click', function () {
    var current = WIZARD_PROPERTIES.EYES_COLORS.indexOf(wizardEyes.style.fill);
    var currentNumber = current !== -1 ? current : 0;
    wizardEyes.style.fill = WIZARD_PROPERTIES.EYES_COLORS[(++currentNumber) % WIZARD_PROPERTIES.EYES_COLORS.length];
  });

  fireballWrap.addEventListener('click', function () {
    fireballColor = ((fireballColor ? fireballColor : 0) + 1) % WIZARD_PROPERTIES.FIREBALL_COLORS.length;
    fireballWrap.style.backgroundColor = WIZARD_PROPERTIES.FIREBALL_COLORS[fireballColor];
  });

})();
