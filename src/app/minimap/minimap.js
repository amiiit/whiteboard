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
        width: '=',
        height: '=',
        currentViewport: '=',
        zoomScale: '='
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

    $scope.$watch('currentViewport', function (relativeViewport) {

      if (!relativeViewport || !relativeViewport.upperLeft) {
        return;
      }

      console.log('currentViewport', relativeViewport);

      var relativeToAbsolute = function (relativePoint) {
        return {
          x: relativePoint.x * $scope.width,
          y: relativePoint.y * $scope.height
        }
      };

      var absoluteUpperLeft = relativeToAbsolute(relativeViewport.upperLeft);
      var absoluteLowerRight = relativeToAbsolute(relativeViewport.lowerRight);

      $scope.frameMeasurments = {
        position: {
          left: absoluteUpperLeft.x,
          top: absoluteUpperLeft.y
        },
        dimension: {
          width: absoluteLowerRight.x - absoluteUpperLeft.x,
          height: absoluteLowerRight.y - absoluteUpperLeft.y
        }
      };

      console.log('frameMeasurments', $scope.frameMeasurments);
    });
  });