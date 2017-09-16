'use strict';

window.myWizard = (function () {

  var setup = document.querySelector('.setup');
  var wizardName = setup.querySelector('.setup-user-name');
  var wizardCoat = setup.querySelector('.wizard-coat');
  var wizardEyes = setup.querySelector('.wizard-eyes');
  var fireballWrap = setup.querySelector('.setup-fireball-wrap');

  var myWizard = new window.Wizard({name: wizardName.value});

  wizardName.addEventListener('change', function () {
    myWizard.setName(wizardName.value);
  });

  wizardEyes.addEventListener('click', function () {
    wizardEyes.style.fill = myWizard.changeEyesColor();
  });

  wizardCoat.addEventListener('click', function () {
    wizardCoat.style.fill = myWizard.changeCoatColor();
  });

  fireballWrap.addEventListener('click', function () {
    fireballWrap.style.backgroundColor = myWizard.changeFireballColor();
  });

  return myWizard;

})();
