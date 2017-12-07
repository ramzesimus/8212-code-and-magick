'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.util = {

    // Check if Escape key is pressed
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },

    // Check if Enter key is pressed
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },

    // Get random number
    getRandomInt: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    // Get random number in array
    getRandomIntArr: function (arr) {
      return arr[window.util.getRandomInt(0, arr.length - 1)];
    },

    // Get item with the max value
    getMaxItem: function (arr) {
      var max = -1;
      for (var i = 0; i < arr.length; i++) {
        var time = arr[i];
        if (time > max) {
          max = time;
        }
      }
      return max;
    },

    // Change 'fill' property of element
    fillElement: function (element, color) {
      element.style.fill = color;
    },

    // Change 'backround-color' property of element
    changeElementBackground: function (element, color) {
      element.style.backgroundColor = color;
    }
  };
})();
