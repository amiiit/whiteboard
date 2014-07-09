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
        currentViewport: '='
      },
      templateUrl: 'app/minimap/minimap.tpl.html',
      controller: 'MinimapCtrl',
      replace: true
    }
  })
  .controller('MinimapCtrl', function ($scope, RouterService) {

    $scope.zoomScale = 0.075;

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

    $scope.$watch('currentViewport', function (viewPort) {
       console.log('new viewport', viewPort);
    });
  });