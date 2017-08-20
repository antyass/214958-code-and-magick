'use strict';

/**
 * Объект-маг
 * @typedef {object} Wizard
 * @property {string} name - Имя волшебника
 * @property {string} coatColor - Цвет мантии
 * @property {string} eyesColor - Цвет глаз
 */

var setup = document.querySelector('.setup');
setup.classList.remove('hidden');

var WIZARD_PROPERTIES = {
  FIRST_NAMES: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  LAST_NAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green']
};

/**
 * Возвращает рандомный элемент массива
 * @param {array} array
 * @return {*}
 */
var getRandomArrayElem = function (array) {
  return array[Math.round(Math.random() * (array.length - 1))];
};

/**
 * Создает рандомного волшебника
 * @return {object}
 */
var createWizard = function () {
  return {
    coatColor: getRandomArrayElem(WIZARD_PROPERTIES.COAT_COLORS),
    eyesColor: getRandomArrayElem(WIZARD_PROPERTIES.EYES_COLORS)
  };
};

/**
 * Создаёт массив, состоящий из сгенерированных объектов
 * @param {number} length
 * @param {function} getItem
 * @return {array}
 */
var getRandomArray = function (length, getItem) {
  var items = [];

  for (var i = 0; i < length; i++) {
    items.push(getItem());
  }

  return items;
};

/**
 * Создаёт уникальные имена
 * @param {Array.<Wizard>} arr
 */
var getWizardsNames = function (arr) {
  var uniqueArray = [];
  arr.forEach(function (elem) {
    var name = getRandomArrayElem(WIZARD_PROPERTIES.FIRST_NAMES) + ' ' + getRandomArrayElem(WIZARD_PROPERTIES.LAST_NAMES);
    while (uniqueArray.includes(name)) {
      name = getRandomArrayElem(WIZARD_PROPERTIES.FIRST_NAMES) + ' ' + getRandomArrayElem(WIZARD_PROPERTIES.LAST_NAMES);
    }
    uniqueArray.push(name);
    elem.name = name;
  });
};

var numberOfWizards = 4;
var wizards = getRandomArray(numberOfWizards, createWizard);
getWizardsNames(wizards);
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
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

/**
 * Заполняет блок DOM-элементами на основе массива JS-объектов
 * @param {array} array
 * @param {function} fn
 * @return {DocumentFragment}
 */
var getFragment = function (array, fn) {
  var fragment = document.createDocumentFragment();

  array.forEach(function (elem) {
    fragment.appendChild(fn(elem));
  });

  return fragment;
};

var wizardsList = getFragment(wizards, renderWizard);

similarList.appendChild(wizardsList);
setup.querySelector('.setup-similar').classList.remove('hidden');
