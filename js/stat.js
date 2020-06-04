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

var dataClouds = [
  {x: 110, y: 20, width: 420, height: 270, color: 'rgba(0, 0, 0, 0.7)'},
  {x: 100, y: 10, width: 420, height: 270, color: '#fff'},
];

var renderCloud = function (ctx, data) {
  ctx.fillStyle = data.color;
  ctx.fillRect(data.x, data.y, CLOUD_WIDTH, CLOUD_HEIGHT);
};
var renderTextOnCloud = function (ctx, x, y, text) {
  ctx.fillStyle = '#000';
  ctx.font = '16px, PT Mono';
  ctx.fillText(text, x, y, TEXT_WIDTH_MAX);
};
var renderBar = function (ctx, data) {
  renderTextOnCloud(ctx, data.xLabel, data.yLabel, data.label);
  ctx.fillStyle = data.color;
  ctx.fillRect(data.xBar, data.yBar, data.widthBar, data.heightBar);
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
  return 'hsl(241, 100%,' + Math.random() * (max - min) + min + '%)';
};

window.renderStatistics = function (ctx, players, times) {
  for (var j = 0; j < dataClouds.length; j++) {
    renderCloud(ctx, dataClouds[j]);
  }
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  renderTextOnCloud(ctx, 200, 40, TEXT_IN_CLOUD_1);
  renderTextOnCloud(ctx, 200, 60, TEXT_IN_CLOUD_2);

  var maxTime = getMaxElement(times);
  for (var i = 0; i < players.length; i++) {
    var getBarSize = (barHeight * times[i]) / maxTime;
    var barData = {
      color: players[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : getRandomBarColor(10, 99),
      label: players[i],
      xLabel: FIRST_PLAYER_NAME_X + (GAP + BAR_WIDTH) * [i],
      yLabel: FIRST_PLAYER_NAME_Y,
      xBar: FIRST_PLAYER_NAME_X + (GAP + BAR_WIDTH) * [i],
      yBar: 250 - getBarSize,
      widthBar: BAR_WIDTH,
      heightBar: getBarSize,
    };
    renderBar(ctx, barData);
    renderTextOnCloud(ctx, FIRST_PLAYER_NAME_X + (GAP + BAR_WIDTH) * [i], 240 - getBarSize, Math.round(times[i]));
  }
};
