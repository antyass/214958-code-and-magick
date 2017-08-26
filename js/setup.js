'use strict';

/**
 * Объект-маг
 * @typedef {object} Wizard
 * @property {string} name - Имя волшебника
 * @property {string} coatColor - Цвет мантии
 * @property {string} eyesColor - Цвет глаз
 */

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var setupUserName = setup.querySelector('.setup-user-name');
var wizardCoat = setup.querySelector('.wizard-coat');
var wizardEyes = setup.querySelector('.wizard-eyes');
var fireballWrap = setup.querySelector('.setup-fireball-wrap');
var setupSubmit = setup.querySelector('.setup-submit');
var fireballColor;

var WIZARD_PROPERTIES = {
  FIRST_NAMES: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  LAST_NAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],
  FIREBALL_COLORS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848']
};

var KEYS = {
  ESC: 27,
  ENTER: 13
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

/**
 * Обрабатывает событие нажатия клавиши escape на форме
 * @param {Event} evt
 */
var popupEscPressHandler = function (evt) {
  var target = evt.target;
  if (evt.keyCode === KEYS.ESC && target !== setupUserName) {
    closePopup();
  }
};

/**
 * Открывает попап и добавляет событие для закрытия попапа при нажатии клавиши escape
 */
var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', popupEscPressHandler);
};

/**
 * Закрывает попап и удаляет событие для закрытия попапа при нажатии клавиши escape
 */
var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', popupEscPressHandler);
};

/**
 * Обрабатывает событие нажатия клавиши enter или клика
 * @param {Event} evt
 */
var openPopupEventHandler = function (evt) {
  if (evt.keyCode === KEYS.ENTER || evt.type === 'click') {
    openPopup();
  }
};

/**
 * Обрабатывает событие нажатия клавиши escape или клика
 * @param {Event} evt
 */
var closePopupEventHandler = function (evt) {
  if (evt.keyCode === KEYS.ESC || evt.type === 'click') {
    closePopup();
  }
};

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

var numberOfWizards = 4;
var wizards = getRandomArray(numberOfWizards, createWizard);
getWizardsNames(wizards);
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
var similarList = document.querySelector('.setup-similar-list');
var wizardsList = getFragment(wizards, renderWizard);

similarList.appendChild(wizardsList);
setup.querySelector('.setup-similar').classList.remove('hidden');

setupOpen.addEventListener('click', openPopupEventHandler);
setupOpen.addEventListener('keydown', openPopupEventHandler);

setupClose.addEventListener('click', closePopupEventHandler);
setupClose.addEventListener('keydown', closePopupEventHandler);

setupSubmit.addEventListener('click', closePopup);
setupSubmit.addEventListener('keydown', closePopup);
