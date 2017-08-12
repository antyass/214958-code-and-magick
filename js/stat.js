'use strict';

/**
 * Отображает холст со статистикой
 * @param  {CanvasRenderingContext2D} ctx
 * @param  {Array.<string>} names - Массив с именами
 * @param  {Array.<number>} times - Массив с временами
 */
window.renderStatistics = function (ctx, names, times) {
  // Тень окна статистики
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(110, 20, 420, 270);

  // Окно статистики
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(100, 10, 420, 270);

  // Текст окна статистики
  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);

  var histogramHeight = 150;
  var worstTime = Math.max.apply(null, times);
  var step = histogramHeight / worstTime;
  var barWidth = 40;
  var barIndent = 50;
  var textIndent = 15;
  var initialX = 140;
  var initialY = 250;

  ctx.textBaseline = 'middle';

  /**
   * Отображает текст гистограммы
   * @param {number} distance - Отступ колонки
   * @param {number} index
   */
  var writeText = function (distance, index) {
    ctx.fillStyle = '#000000';
    ctx.fillText(names[index], distance, initialY + textIndent);
    ctx.fillText(Math.round(times[index]), distance, initialY - times[index] * step - textIndent);
  };

  /**
   * Отрисовывает колонки гистограммы
   * @param {number} distance - Отступ колонки
   * @param {number} index
   */
  var drawBars = function (distance, index) {
    var colorSaturation = Math.ceil(Math.random() * 10) / 10;
    ctx.fillStyle = (names[index] === 'Вы') ?
      'rgba(255, 0, 0, 1)' :
      'rgba(0, 0, 255, ' + colorSaturation + ')';
    ctx.fillRect(distance, initialY, barWidth, -(times[index] * step));
  };

  // Отрисовка гистограммы
  for (var i = 0; i < times.length; i++) {
    var barDistance = initialX + (barIndent + barWidth) * i;
    drawBars(barDistance, i);
    writeText(barDistance, i);
  }
};
