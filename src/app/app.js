'use strict';

angular.module('nuBoard', ['firebase'])

  .constant('AppConfig', {
    defaultToolset: {
      stylus: {id: 'line', value: 'line'},
      color: {id: 'skyblue', value: 'skyblue'},
      width: {id: '5', value: 5},
      lineCap: {id: 'round', value: 'round'},
      lineJoin: {id: 'round', value: 'round'}
    },
    firebase: {
      baseUrl: 'https://fiery-fire-1095.firebaseio.com',
      appNamespace: 'nuBoard'
    }
  })

  .run(['Logger', function (Logger) {
    // init Logger
    Logger.setLevel(Logger.LOG);
  }])

  .controller('MainCtrl', function ($scope) {
    $scope.boardId = 'zXzXzXzXz'
  });