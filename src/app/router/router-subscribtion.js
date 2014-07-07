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
//    $scope.$watch('routerData', function (a, b, c) {
//
//    }, true);
    $scope.$watch('log', function (newLog, oldLog) {
      var lastObject = _.last(newLog);
      if (!lastObject) {
        return
      }
      RouterService.report({
        sourceId: $scope.sourceId,
        changedObjectId: lastObject.shapeId, //todo: generalize this,
        changedObject: lastObject
      });
    }, true);
  })
;