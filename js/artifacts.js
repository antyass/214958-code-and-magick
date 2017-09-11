'use strict';

window.artifacts = (function () {
  var OFFSET = 10;

  var popupElement = document.createElement('div');
  popupElement.classList.add('wizard-artifacts');
  popupElement.classList.add('wizard-artifacts-hide');
  document.body.appendChild(popupElement);

  /**
   * Обновляет координаты попапа при движении мышью
   * @param {MouseEvent} evt
   */
  var mouseMoveHandler = function (evt) {
    var coords = popupElement.getBoundingClientRect();
    var top = evt.clientY + coords.height + OFFSET > document.documentElement.clientHeight ?
      document.documentElement.clientHeight - coords.height + pageYOffset :
      evt.pageY + OFFSET;
    popupElement.style.top = top + 'px';
    popupElement.style.left = evt.pageX + OFFSET + 'px';
  };

  /**
   * Открывает попап с интентарем волшебника при наведении
   * @param {SVGGElement} target
   * @param {Function} cb
   */
  var openPopup = function (target, cb) {
    var mouseOutHandler = function () {
      popupElement.classList.add('wizard-artifacts-hide');
      target.removeEventListener('mousemove', mouseMoveHandler);
      target.removeEventListener('mouseleave', mouseOutHandler);
    };

    target.addEventListener('mouseenter', function () {
      popupElement.innerHTML = '';
      popupElement.appendChild(cb());
      popupElement.classList.remove('wizard-artifacts-hide');
      target.addEventListener('mousemove', mouseMoveHandler);
      target.addEventListener('mouseleave', mouseOutHandler);
    });
  };

  return {
    openPopup: openPopup
  };
})();
