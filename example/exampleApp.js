'use strict';

angular.module('exampleApp', ['vxlbrd'])
  .run(['Logger', function(Logger) {
    Logger.setLevel(Logger.DEBUG); // to enable debug messages set level to Logger.DEBUG, to disable set to Logger.OFF
  }])
  .controller('exampleCtrl', ['$scope', function($scope) {
    $scope.vxlbrdDataExample = [];
  }]);
