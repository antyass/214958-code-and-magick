'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var setupUserName = setup.querySelector('.setup-user-name');
  var setupSubmit = setup.querySelector('.setup-submit');
  var dialogHandle = setup.querySelector('.setup-user-pic');
  var shopElement = setup.querySelector('.setup-artifacts-shop');
  var artifactsElement = setup.querySelector('.setup-artifacts');
  var draggedItem = null;

  var DROPPABLE = 'droppable';
  var DROP_COLOR = 'dropColor';

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
    setup.style = '';
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

  dialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mouseMoveEventHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setup.style.top = (setup.offsetTop - shift.y) + 'px';
      setup.style.left = (setup.offsetLeft - shift.x) + 'px';
    };

    var mouseUpEventHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveEventHandler);
      document.removeEventListener('mouseup', mouseUpEventHandler);
    };

    document.addEventListener('mousemove', mouseMoveEventHandler);
    document.addEventListener('mouseup', mouseUpEventHandler);
  });

  shopElement.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      var cloneElem = evt.target.cloneNode(true);
      draggedItem = cloneElem;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
      artifactsElement.classList.add(DROPPABLE);
    }
  });

  shopElement.addEventListener('dragend', function () {
    artifactsElement.classList.remove(DROPPABLE);
  });

  artifactsElement.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  artifactsElement.addEventListener('drop', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'div' && !evt.target.hasChildNodes()) {
      evt.target.appendChild(draggedItem);
      artifactsElement.classList.remove(DROPPABLE);
    }
    evt.target.classList.remove(DROP_COLOR);
    evt.preventDefault();
    return false;
  });

  artifactsElement.addEventListener('dragenter', function (evt) {
    evt.target.classList.add(DROP_COLOR);
    evt.preventDefault();
  });

  artifactsElement.addEventListener('dragleave', function (evt) {
    evt.target.classList.remove(DROP_COLOR);
    evt.preventDefault();
  });

})();
