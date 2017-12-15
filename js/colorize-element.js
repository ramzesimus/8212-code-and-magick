'use strict';

(function () {
  window.colorizeElement = function (element, color, callback) {
    var newColor;

    if (typeof color === 'object') {
      newColor = window.util.getRandomIntArr(color);
    } else {
      newColor = color;
    }

    if (typeof callback === 'function') {
      callback(element, newColor);
    }
  };
}());
