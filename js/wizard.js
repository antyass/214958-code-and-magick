'use strict';

window.Wizard = (function () {

  /**
   * Объект-маг
   * @typedef {object} WizardData
   * @property {string} name - Имя волшебника
   * @property {string} coatColor - Цвет мантии
   * @property {string} eyesColor - Цвет глаз
   * @property {string} fireballColor - Цвет файрбола
   */

  /**
   * Создаёт нового волшебника
   * @param {object} data
   * @class
   */
  var Wizard = function (data) {
    this.name = data.name;
    this.coatColor = data.colorCoat;
    this.eyesColor = data.colorEyes;
    this.fireballColor = data.colorFireball;
  };

  Wizard.COAT_COLORS = ['rgb(146, 100, 161)', 'rgb(215, 210, 55)', 'rgb(241, 43, 107)', 'rgb(101, 137, 164)', 'rgb(0, 0, 0)', 'rgb(215, 210, 55)', 'rgb(56, 159, 117)', 'rgb(241, 43, 107)'];
  Wizard.EYES_COLORS = ['red', 'orange', 'yellow', 'green', 'lightblue', 'blue', 'purple'];
  Wizard.FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  /**
   * Меняет цвет
   * @param {Array.<string>} arr
   * @param {string} current
   * @return {string}
   */
  Wizard.getNextColor = function (arr, current) {
    return arr[(arr.indexOf(current) + 1) % arr.length];
  };

  /**
   * Устанавливает имя волшебника
   * @param {name} name
   * @return {name}
   */
  Wizard.prototype.setName = function (name) {
    if (!name) {
      throw new Error('Имя не задано');
    }
    this.name = name;
    return name;
  };

  /**
   * Меняет цвет плаща волшебника
   * @return {coatColor}
   */
  Wizard.prototype.changeCoatColor = function () {
    this.coatColor = this.constructor.getNextColor(this.constructor.COAT_COLORS, this.coatColor);
    this.onChange();
    return this.coatColor;
  };

  /**
   * Меняет цвет глаз волшебника
   * @return {eyesColor}
   */
  Wizard.prototype.changeEyesColor = function () {
    this.eyesColor = this.constructor.getNextColor(this.constructor.EYES_COLORS, this.eyesColor);
    this.onChange();
    return this.eyesColor;
  };

  /**
   * Меняет цвет файрбола волшебника
   * @return {fireballColor}
   */
  Wizard.prototype.changeFireballColor = function () {
    this.fireballColor = this.constructor.getNextColor(this.constructor.FIREBALL_COLORS, this.fireballColor);
    return this.fireballColor;
  };

  return Wizard;

})();
