'use strict';

// Get item with the max value
var getMaxItem = function (arr) {
  var max = -1;
  for (var i = 0; i < arr.length; i++) {
    var time = arr[i];
    if (time > max) {
      max = time;
    }
  }

  return max;
}

// Render statistics
window.renderStatistics = function (ctx, names, times) {

  // Score Box shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(110, 20, 420, 270);

  // Score Box
  ctx.fillStyle = 'white';
  ctx.fillRect(100, 10, 420, 270);

  // Notification
  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);

  // Histogram
  var histogramHeight = 150,
      barWidth = 40,
      barGutter = 50,
      columnWidth = barWidth + barGutter,
      histogramInitialX = 155,
      histogramInitialY = 90;

  // Proportion Step
  var step = histogramHeight / (getMaxItem(times) - 0);

  // Draw Bars with Names
  for (var i = 0; i < times.length; i++) {
    ctx.fillRect(i * columnWidth + histogramInitialX, histogramInitialY + (histogramHeight - times[i] * step), barWidth, times[i] * step);
    ctx.fillText(Math.ceil(times[i]), i * columnWidth + histogramInitialX, histogramInitialY - 5 + (histogramHeight - times[i] * step));
    ctx.fillText(names[i], i * columnWidth + histogramInitialX, histogramHeight + 110);
  }

};
