'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var TEXT_IN_CLOUD_1 = 'Ура вы победили!';
var TEXT_IN_CLOUD_2 = 'Список результатов:';
var FIRST_PLAYER_NAME_X = 140;
var FIRST_PLAYER_NAME_Y = 270;
var TEXT_WIDTH_MAX = 210;
var GAP = 60;
var BAR_WIDTH = 40;
var barHeight = CLOUD_HEIGHT - GAP - BAR_WIDTH - GAP;


var renderCloud = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};
var renderTextOnCloud = function (ctx, x, y, sizeText, text) {
  ctx.font = '16px, PT Mono';
  ctx.fillText(text, x, y, sizeText);
};
var renderBar = function (ctx, color, label, xLabel, yLabel, xBar, yBar, widthBar, heightBar) {
  ctx.fillStyle = color;
  ctx.fillText(label, xLabel, yLabel);
  ctx.fillRect(xBar, yBar, widthBar, heightBar);
};
var getMaxElement = function (times) {
  if (times.length > 0) {
    var max = times[0];
    for (var i = 1; i < times.length; i++) {
      if (times[i] > max) {
        max = times[i];
      }
    }
  }
  return max;
};
var getRandomBarColor = function (min, max) {
  var color = 'hsl(241, 100%,' + Math.random() * (max - min) + min + '%)';
  return color;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, 110, 20, 420, 270, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, 100, 10, 420, 270, '#fff');

  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  renderTextOnCloud(ctx, 200, 40, TEXT_WIDTH_MAX, TEXT_IN_CLOUD_1);
  renderTextOnCloud(ctx, 200, 60, TEXT_WIDTH_MAX, TEXT_IN_CLOUD_2);

  var maxTime = getMaxElement(times);
  for (var i = 0; i < players.length; i++) {
    var getBarSize = (barHeight * times[i]) / maxTime;
    if (players[i] === 'Вы') {
      renderBar(ctx,
        'rgba(255, 0, 0, 1)',
        players[i],
        FIRST_PLAYER_NAME_X + (GAP + BAR_WIDTH) * [i],
        FIRST_PLAYER_NAME_Y,
        FIRST_PLAYER_NAME_X + (GAP + BAR_WIDTH) * [i],
        250 - getBarSize,
        BAR_WIDTH,
        getBarSize);
    }
    else {
      renderBar(ctx,
        getRandomBarColor(10, 99),
        players[i],
        FIRST_PLAYER_NAME_X + (GAP + BAR_WIDTH) * [i],
        FIRST_PLAYER_NAME_Y,
        FIRST_PLAYER_NAME_X + (GAP + BAR_WIDTH) * [i],
        250 - getBarSize,
        BAR_WIDTH,
        getBarSize);
    }
  }
};
