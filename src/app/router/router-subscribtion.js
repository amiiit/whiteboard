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
    console.log('router ctrl');
    RouterService.register({
      instanceId: $scope.sourceId,
      callback: function (data) {
        console.log('pushing to log', $scope.log);
        $scope.log.push(data);
      }
    });

    var replaceIdAttributeIfApplicable = function (objectIdAttribute, object) {
      console.log('router ctrl');

      if (objectIdAttribute) {
        var objectId = object[objectIdAttribute];
        if (objectId) {
          object.id = objectId;
          delete object[objectIdAttribute];
        }
      }
    };

    $scope.$watch('log', function (newLog, oldLog) {
      console.log('router ctrl');

      var lastObject = _.last(newLog);
      if (!lastObject) {
        return
      }
      replaceIdAttributeIfApplicable($scope.objectIdAttribute, lastObject);

      RouterService.report({
        sourceId: $scope.sourceId,
        message: lastObject
      });
    }, true);


  });
