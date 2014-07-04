angular.module('nuBoard')
  .directive('nuRouterSubscription', function () {
    return {
      controller: 'RouterCtrl'
    }
  })
  .controller('RouterCtrl', function ($scope) {
    console.log('router controller', $scope.routerData);
  })
;