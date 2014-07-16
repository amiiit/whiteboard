angular.module('nuBoard')
  .directive('nuFollowAction', function () {
    return {
      restrict: 'E',
      scope: {
        relativeFocus: '=',
        surfaceWidth: '&',
        surfaceHeight: '&'
      },
      link: function (element, $scope) {

      },
      controller: 'FollowActionCtrl'
    }
  })
  .controller('FollowActionCtrl', function (RouterService, $scope, UserService) {

    console.log('FollowActionCtrl');

    var ownUserId = UserService.id();

    var focusOnAction = function (action) {
      var points = action.points;
      var lastPoint = [points[points.length - 2], points[points.length - 1]];

      var focusPoint = {
        x: lastPoint[0] / $scope.surfaceWidth(),
        y: lastPoint[1] / $scope.surfaceHeight()
      };

      console.log('focus on', focusPoint);

      $scope.relativeFocus = focusPoint;


    };

    RouterService.register({
      instanceId: 'follow-action',
      callback: function (action) {
        if (action.sourceId != ownUserId) {
          focusOnAction(action);
        }
      }
    });
  })
;
