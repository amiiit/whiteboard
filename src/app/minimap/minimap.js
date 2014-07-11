angular.module('nuBoard')
  .directive('nuMinimap', function () {
    return {
      restrict: 'E',
      link: function ($scope, $element) {

        $element.on('mousedown', function (event) {
          var relativeX = event.offsetX / $scope.width;
          var relativeY = event.offsetY / $scope.height;
          $scope.$apply(function () {
            $scope.setFocus({x: relativeX, y: relativeY});
          });
        });
      },
      scope: {
        relativeFocus: '=',
        width: '&',
        height: '&',
        zoomScale: '=',
        surfaceVisibleMeasurements: '='
      },
      templateUrl: 'app/minimap/minimap.tpl.html',
      controller: 'MinimapCtrl',
      replace: true
    }
  })
  .controller('MinimapCtrl', function ($scope, RouterService) {

    RouterService.register({
      instanceId: 'minimap',
      callback: function (action) {
        $scope.$emit('shapechange', action);
      }
    });

    $scope.setFocus = function (focus) {
      $scope.relativeFocus = focus;
      console.log('$scope.relativeFocus', $scope.relativeFocus);
    };

    $scope.$watch('surfaceVisibleMeasurements', function (measurements) {

      var ownWidth = $scope.width();
      var ownHeight = $scope.height();

      var pa = measurements.pointA;
      var pb = measurements.pointB;

      console.log('pa', pa);
      console.log('pb', pb);

      console.log('ownWidth',ownWidth);
      console.log('ownHeight',ownHeight);

      $scope.frameMeasurments = {
        position: {
          top: pa.y * ownHeight,
          left: pa.x * ownWidth
        },
        dimension: {
          width: (pb.x - pa.x) * ownWidth,
          height: (pb.y - pa.y) * ownHeight
        }
      };

      console.log('frame position', $scope.frameMeasurments.position);

    })
  });