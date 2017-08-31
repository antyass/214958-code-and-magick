'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var setupUserName = setup.querySelector('.setup-user-name');
  var setupSubmit = setup.querySelector('.setup-submit');

  /**
   * Обрабатывает событие нажатия клавиши escape на форме
   * @param {Event} evt
   */
  var popupEscPressHandler = function (evt) {
    if (evt.target !== setupUserName) {
      window.util.isEscEvent(evt, closePopup);
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
    window.util.isEnterEvent(evt, openPopup);
  };

  /**
   * Обрабатывает событие нажатия клавиши escape или клика
   * @param {Event} evt
   */
  var closePopupEventHandler = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };

  setupOpen.addEventListener('click', openPopup);
  setupOpen.addEventListener('keydown', openPopupEventHandler);

  setupClose.addEventListener('click', closePopup);
  setupClose.addEventListener('keydown', closePopupEventHandler);

  setupSubmit.addEventListener('click', closePopup);
  setupSubmit.addEventListener('keydown', closePopup);

})();
