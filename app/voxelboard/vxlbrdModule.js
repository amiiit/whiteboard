'use strict';
angular.module('vxlbrd', [])
  .run(['Logger', function(Logger) {
    // init Logger
    Logger.setLevel(Logger.LOG);
  }]);
