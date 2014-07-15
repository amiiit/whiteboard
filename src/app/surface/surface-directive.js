'use strict';

angular.module('nuBoard')
  .directive('nuSurface', function (SurfaceService, $window, Viewport) {
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


          var viewport = Viewport.dimensions();
          var ownWidth = $scope.width();
          var ownHeight = $scope.height();

          $scope.visibleMeasurements = {
            pointA: {
              x: windowOffset.x / ownWidth, y: windowOffset.y / ownHeight
            },
            pointB: {
              x: (windowOffset.x + viewport.width - surfaceOffset.left) / ownWidth,
              y: (windowOffset.y + viewport.height - surfaceOffset.top) / ownHeight
            },
            width: (viewport.width - surfaceOffset.left) / ownWidth,
            height: (viewport.height - surfaceOffset.top) / ownHeight
          };
        };

        angular.element($window).on('resize scroll', function () {
          $scope.$apply(function () {
            setVisibleMeasurements();
          });
        });

        setVisibleMeasurements();


        $scope.$watch('relativeFocus', function (focus) {
          var ownWidth = $scope.width();
          var ownHeight = $scope.height();
          var visibleWidth = $scope.visibleMeasurements.width;
          var visibleHeight = $scope.visibleMeasurements.height;

          var scrollToRelative = {
            x: focus.x - visibleWidth / 2,
            y: focus.y - visibleHeight / 2
          };

          var scrollTo = {
            x: scrollToRelative.x * ownWidth,
            y: scrollToRelative.y * ownHeight
          };

          angular.element($window)[0].scrollTo(scrollTo.x, scrollTo.y);
        });

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
  });
