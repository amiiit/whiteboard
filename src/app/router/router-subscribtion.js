angular.module('nuBoard')
  .directive('nuRouterSubscription', function () {
    return {
      controller: 'RouterCtrl',
      restrict: 'E',
      scope: {
        routerData: '=',
        log: '=',
        sourceId: '@',
        objectIdAttribute: '@'
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
      if ($scope.objectIdAttribute) {
        var objectId = lastObject[$scope.objectIdAttribute];
        if (objectId) {
          lastObject.id = objectId;
          delete lastObject[$scope.objectIdAttribute];
        }
      }
      RouterService.report({
        sourceId: $scope.sourceId,
        message: lastObject
      });
    }, true);


  });
