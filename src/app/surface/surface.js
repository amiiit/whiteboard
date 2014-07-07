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
        shapes: '=',
        shapesLog: '='
      },
      link: function ($scope, element, attrs) {


      },
      controller: 'SurfaceCtrl'
    };
  }
)
  .controller('SurfaceCtrl', function ($scope) {

    $scope.shapesLog = [];

    $scope.$on('shapechange', function (event, shapeId) {
      if (!$scope.shapesLog) {
        $scope.shapesLog = [];
      }
      $scope.shapesLog.push($scope.shapes[shapeId]);

    });


  });
