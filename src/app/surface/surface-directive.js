'use strict';

angular.module('nuBoard')
  .directive('nuSurface', function (SurfaceService, $window) {
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

        angular.element($window).on('resize', function(){
          console.log('resize: element', element);
          console.log('offsetLeft', element[0].offsetLeft);
          console.log('offsetTop', element[0].offsetTop);
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

    $scope.$watch('relativeFocus', function (focus) {
      console.log('relative focus', focus);
    })
  });
