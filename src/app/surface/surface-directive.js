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
        visibleDimensions: '=',
        positionOffset: '='
      },
      link: function ($scope, element, attrs) {

        SurfaceService.shareScope($scope);

        var setPositionOffset = function () {
          $scope.positionOffset = {
            left: element[0].offsetLeft,
            top: element[0].offsetTop
          };
          console.log('setting offset', $scope.positionOffset);
        };

        angular.element($window).on('resize', function () {

          var viewport = BoardUtils.viewport();
          $scope.$apply(function () {

            $scope.visibleDimensions = {
              width: viewport.width - element[0].offsetLeft,
              height: viewport.height - element[0].offsetTop
            };

            setPositionOffset();

          });

        });
        setPositionOffset();


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
