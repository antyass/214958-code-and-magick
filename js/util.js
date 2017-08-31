'use strict';

window.util = (function () {

  var KEYS = {
    ESC: 27,
    ENTER: 13
  };

  return {
    /**
     * Обрабатывает событие нажатия клавиши escape
     * @param {Event} evt
     * @param {Function} action
     */
    isEscEvent: function (evt, action) {
      if (evt.keyCode === KEYS.ESC) {
        action();
      }
    },

    /**
     * Обрабатывает событие нажатия клавиши enter
     * @param {Event} evt
     * @param {Function} action
     */
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === KEYS.ENTER) {
        action();
      }
    },

    /**
     * Возвращает рандомный элемент массива
     * @param {array} array
     * @return {*}
     */
    getRandomArrayElem: function (array) {
      return array[Math.round(Math.random() * (array.length - 1))];
    },

    /**
     * Создаёт массив, состоящий из сгенерированных объектов
     * @param {number} length
     * @param {function} getItem
     * @return {array}
     */
    getRandomArray: function (length, getItem) {
      var items = [];

      for (var i = 0; i < length; i++) {
        items.push(getItem());
      }

      return items;
    },

    /**
     * Заполняет блок DOM-элементами на основе массива JS-объектов
     * @param {array} array
     * @param {function} fn
     * @return {DocumentFragment}
     */
    getFragment: function (array, fn) {
      var fragment = document.createDocumentFragment();

      array.forEach(function (elem) {
        fragment.appendChild(fn(elem));
      });

      return fragment;
    }

  };
})();
