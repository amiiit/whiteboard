'use strict';

angular.module('nuBoard', [])

  .constant('AppConfig', {
    defaultToolset: {
      stylus: {id: 'pen', value: 'pen'},
      color: {id: 'skyblue', value: 'skyblue'},
      width: {id: '5', value: 5},
      lineCap: {id: 'round', value: 'round'},
      lineJoin: {id: 'round', value: 'round'}
    }
  })

  .run(['Logger', function (Logger) {
    // init Logger
    Logger.setLevel(Logger.LOG);
  }])

  .controller('MainCtrl', function ($scope) {

  });