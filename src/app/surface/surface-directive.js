'use strict';

angular.module('nuBoard')
  .directive('nuSurface', function (SurfaceService, $window, BoardUtils) {
    return {
      restrict: 'E',
      templateUrl: 'app/surface/surface.tpl.html',
      replace: true,
      scope: {
        width: '&',
        height: '&',
        surfaceId: '@',
        shapes: '=',
        shapesLog: '=',
        relativeFocus: '=',
        visibleMeasurements: '='
      },
      link: function ($scope, element, attrs) {

        SurfaceService.shareScope($scope);

        var setVisibleMeasurements = function () {
          var surfaceOffset = {
            left: element[0].offsetLeft,
            top: element[0].offsetTop
          };

          var windowOffset = {
            x: window.pageXOffset,
            y: window.pageYOffset
          };


          console.log('surfaceOffset', surfaceOffset);
          console.log('windowOffset', windowOffset);

          var viewport = BoardUtils.viewport();

          console.log('viewport', viewport);

          var absoluteMeasurements = {
            pointA: {
              x: windowOffset.x, y: windowOffset.y
            },
            pointB: {
              x: windowOffset.x + viewport.width - surfaceOffset.left,
              y: windowOffset.y + viewport.height - surfaceOffset.top
            }

          };

          console.log('absoluteMeasurements.a', absoluteMeasurements.pointA);
          console.log('absoluteMeasurements.b', absoluteMeasurements.pointB);
        };

        angular.element($window).on('resize scroll', function () {
          $scope.$apply(function () {
            setVisibleMeasurements();
          });
        });

        setVisibleMeasurements();

      },
      controller: 'SurfaceCtrl'
    };
  }
)
  .controller('SurfaceCtrl', function ($scope) {

    $scope.shapesLog = [];

    $scope.$on('shapechange', function (event, shape) {
      if (!$scope.shapesLog) {
        $scope.shapesLog = [];
      }
      $scope.shapesLog.push(shape);
      if ($scope.shapesLog.length > 100) {
        $scope.shapesLog = [];
      }

    });

    $scope.$watch('relativeFocus', function (focus) {
      console.log('relative focus', focus);
    })
  });
