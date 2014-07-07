angular.module('nuBoard')
  .directive('nuRouterSubscription', function () {
    return {
      controller: 'RouterCtrl',
      restrict: 'E',
      scope: {
        routerData: '='
      }
    }
  })
  .controller('RouterCtrl', function ($scope) {
    console.log('router controller', $scope.routerData);
    $scope.$watch('routerData', function (a,b,c) {
      console.log('$scope.routerData', $scope.routerData);
      console.log('a',a);
      console.log('b',b);
      console.log('c',c);
    }, true);
  })
;