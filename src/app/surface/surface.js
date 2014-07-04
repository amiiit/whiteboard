'use strict';

angular.module('nuBoard')
  .directive('nuSurface', function (Logger, UUID, $timeout, KineticService, SurfaceWatcherService) {
    return {
      restrict: 'E',
      templateUrl: 'app/surface/surface.tpl.html',
      replace: true,
      scope: {
        width: '&',
        height: '&',
        surfaceId: '@',
        shapes: '='
      },
      link: function ($scope, element, attrs) {


      },
      controller: 'SurfaceCtrl'
    };
  }
)
  .controller('SurfaceCtrl', function ($scope) {



  });
