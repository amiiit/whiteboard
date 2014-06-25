'use strict';

angular.module('nuBoard')
  .factory('UUID', function () {

    var generateUUID = function () {
      // code originates from: https://gist.github.com/elus/3049799
      var r = Math.random,
        p = "0000000",
        n = 0x100000000,
        a = (r() * n >>> 0).toString(16),
        b = ((r() * n & 0xffff4fff | 0x4000) >>> 0).toString(16),
        c = ((r() * n & 0xbfffffff | 0x80000000) >>> 0).toString(16),
        d = (r() * n >>> 0).toString(16);
      if (a.length < 8) {
        a = (p + a).slice(-8);
      }
      if (b.length < 8) {
        b = (p + b).slice(-8);
      }
      if (c.length < 8) {
        c = (p + c).slice(-8);
      }
      if (d.length < 8) {
        d = (p + d).slice(-8);
      }
      return [
        a,
        b.slice(0, 4),
        b.slice(4),
        c.slice(0, 4),
          c.slice(4) + d
      ].join('-');
    }

    return {
      generate: generateUUID
    };
  });
