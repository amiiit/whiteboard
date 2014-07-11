angular.module('nuBoard')
  .directive('nuMinimap', function () {
    return {
      restrict: 'E',
      link: function ($scope, $element) {

        var isClicked = false;

        var processFocusing = function (event) {
          var relativeX = event.offsetX / $scope.width();
          var relativeY = event.offsetY / $scope.height();
          console.log('surfaceVisibleMeasurements', $scope.surfaceVisibleMeasurements);
          $scope.$apply(function () {
            $scope.setFocus({
              x: relativeX - $scope.surfaceVisibleMeasurements.width / 2,
              y: relativeY - $scope.surfaceVisibleMeasurements.height / 2
            });
          });
        };

        $element.on('mousedown', function (event) {
          isClicked = true;
          processFocusing(event);
        });

        $element.on('mousemove', function (event) {
          if (isClicked) {
            processFocusing(event)
          }
        });

        $element.on('mouseup mouseout', function (event) {
          isClicked = false;
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
    };

    $scope.$watch('surfaceVisibleMeasurements', function (measurements) {

      var ownWidth = $scope.width();
      var ownHeight = $scope.height();

      var pa = measurements.pointA;
      var pb = measurements.pointB;

      console.log('pa', pa);
      console.log('pb', pb);

      console.log('ownWidth', ownWidth);
      console.log('ownHeight', ownHeight);

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