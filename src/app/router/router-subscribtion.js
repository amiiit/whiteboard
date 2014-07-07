angular.module('nuBoard')
  .directive('nuRouterSubscription', function () {
    return {
      controller: 'RouterCtrl',
      restrict: 'E',
      scope: {
        routerData: '=',
        log: '=',
        sourceId: '@'
      }
    }
  })
  .controller('RouterCtrl', function ($scope, RouterService) {

    RouterService.register({
      instanceId: $scope.sourceId,
      callback: function (data) {
        console.log('incoming data from router', data);
      }
    });

    $scope.$watch('log', function (newLog, oldLog) {
      var lastObject = _.last(newLog);
      if (!lastObject) {
        return
      }
      RouterService.report({
        sourceId: $scope.sourceId,
        message: lastObject
      });
    }, true);


  });
