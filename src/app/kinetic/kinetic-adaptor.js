'use strict';

angular.module('nuBoard')

  .directive('nu-kinetic', function () {
    return {
      restrict: 'A',
      replace: false,
      scope: {
        config: '=',
        name: '@name'
      },
      controller: 'KineticCtrl'
    };
  })

  .controller('KineticCtrl', function ($scope, $element) {

  })


;
