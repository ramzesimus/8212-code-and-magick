'use strict';

(function () {
  // Box
  var boxBgColor = '#fff';
  var boxInitialX = 100;
  var boxInitialY = 10;
  var boxWidth = 420;
  var boxHeight = 270;
  var boxShadowSize = 10;
  var boxShadowColor = 'rgba(0, 0, 0, 0.7)';

  // Box Notification
  var boxColor = 'rgba(0, 0, 0, 1)';
  var boxFont = '16px PT Mono';
  var boxTitle = 'Ура вы победили!';
  var boxSubtitle = 'Список результатов:';

  // Player
  var playerName = 'Вы';
  var playerBarColor = 'rgba(255, 0, 0, 1)';

  // Set Bar color
  var setBarColor = function (ctx, names) {
    if (names === playerName) {
      ctx.fillStyle = playerBarColor;
    } else {
      ctx.fillStyle = 'rgba(0, 0, 255, ' + Math.random() + ')';
    }
  };

  // Render statistics
  window.renderStatistics = function (ctx, names, times) {

    // Score Box shadow
    ctx.fillStyle = boxShadowColor;
    ctx.fillRect(boxInitialX + boxShadowSize, boxInitialY + boxShadowSize, boxWidth, boxHeight);

    // Score Box
    ctx.fillStyle = boxBgColor;
    ctx.fillRect(boxInitialX, boxInitialY, boxWidth, boxHeight);

    // Notification
    ctx.fillStyle = boxColor;
    ctx.font = boxFont;
    ctx.fillText(boxTitle, 120, 40);
    ctx.fillText(boxSubtitle, 120, 60);

    // Histogram
    var histogramHeight = 150;
    var barWidth = 40;
    var barGutter = 50;
    var columnWidth = barWidth + barGutter;
    var histogramInitialX = 155;
    var histogramInitialY = 90;
    var histogramResultMargin = histogramInitialY - 5;
    var histogramLabelPosition = histogramHeight + histogramInitialY + 20;

    // Proportion Step
    var step = histogramHeight / (window.util.getMaxItem(times) - 0);

    // Draw Bars (set color, fill bars, add times, add labels)
    for (var i = 0; i < times.length; i++) {
      setBarColor(ctx, names[i]);
      ctx.fillRect(i * columnWidth + histogramInitialX, histogramInitialY + (histogramHeight - times[i] * step), barWidth, times[i] * step);
      ctx.fillStyle = '#000';
      ctx.fillText(Math.ceil(times[i]), i * columnWidth + histogramInitialX, histogramResultMargin + (histogramHeight - times[i] * step));
      ctx.fillText(names[i], i * columnWidth + histogramInitialX, histogramLabelPosition);
    }

  };
})();
