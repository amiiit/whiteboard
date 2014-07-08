angular.module('nuBoard')
  .directive('nuMinimap', function () {
    return {
      restrict: 'E',
      link: function ($scope, $element) {

      },
      templateUrl: 'app/minimap/minimap.tpl.html',
      controller: 'MinimapCtrl',
      replace: true
    }
  })
  .controller('MinimapCtrl', function ($scope) {
    console.log('minimap controller');
    $scope.width = 150;
    $scope.height = 150;
  });