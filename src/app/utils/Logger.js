'use strict';

angular.module('nuBoard')
  .factory('Logger', [function () {
    var OFF = 0;
    var LOG = 1;
    var DEBUG = 2;

    var level = OFF;

    return {
      log: function () {
        if (level > 0) console.log.apply(console, [].slice.apply(arguments));
      },
      debug: function () {
        if (level > 1) console.debug.apply(console, [].slice.apply(arguments));
      },
      setLevel: function (lvl) {
        level = lvl;
      },
      OFF: OFF,
      LOG: LOG,
      DEBUG: DEBUG
    };
  }]);
