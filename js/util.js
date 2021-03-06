'use strict';

window.util = (function () {

  var KEYS = {
    ESC: 27,
    ENTER: 13
  };
  var DEBOUNCE_INTERVAL = 500;

  /**
   * Обрабатывает событие нажатия клавиши escape
   * @param {Event} evt
   * @param {Function} action
   */
  var isEscEvent = function (evt, action) {
    if (evt.keyCode === KEYS.ESC) {
      action();
    }
  };

  /**
   * Обрабатывает событие нажатия клавиши enter
   * @param {Event} evt
   * @param {Function} action
   */
  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === KEYS.ENTER) {
      action();
    }
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
   * Создаёт DOM-элемент с сообщением об ошибке
   * @param {string} errorMessage
   */
  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.classList.add('error');
    node.textContent = errorMessage;

    document.body.appendChild(node);
  };

  /**
   * «Устраняет дребезг» при частом вызове той функции, которую ей передают
   * @param {Function} func
   * @return {number}
   */
  var debounce = function (func) {
    var lastTimeout;
    return function () {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(func, DEBOUNCE_INTERVAL);
      return lastTimeout;
    };
  };

  return {
    errorHandler: errorHandler,
    getFragment: getFragment,
    isEnterEvent: isEnterEvent,
    isEscEvent: isEscEvent,
    debounce: debounce
  };

})();
