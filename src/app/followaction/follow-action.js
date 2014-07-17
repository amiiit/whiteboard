angular.module('nuBoard')
  .directive('nuFollowAction', function () {
    return {
      restrict: 'E',
      scope: {
        relativeFocus: '=',
        surfaceWidth: '&',
        surfaceHeight: '&',
        surfaceVisibleMeasurements: '&'
      },
      link: function (element, $scope) {

      },
      controller: 'FollowActionCtrl'
    }
  })
  .controller('FollowActionCtrl', function (RouterService, $scope, UserService, ToolbarService) {

    var ownUserId = UserService.id();

    var isFollowActive = function () {
      return ToolbarService.getState().followAction
    };


    var setFocus = function (focusPoint) {
      $scope.relativeFocus = focusPoint;
    };


    var isVisible = function (relativePoint) {
      var surfaceVisibleMeasurements = $scope.surfaceVisibleMeasurements();
      return relativePoint.x > surfaceVisibleMeasurements.pointA.x
        && relativePoint.x < surfaceVisibleMeasurements.pointB.x
        && relativePoint.y > surfaceVisibleMeasurements.pointA.y
        && relativePoint.y < surfaceVisibleMeasurements.pointB.y
    };

    var lastRelativeActionPoint = function (action) {
      var points = action.points;
      var lastPoint = [points[points.length - 2], points[points.length - 1]];

      return {
        x: lastPoint[0] / $scope.surfaceWidth(),
        y: lastPoint[1] / $scope.surfaceHeight()
      };
    };

    var handleIncomingAction = function (action) {
      var focusPoint = lastRelativeActionPoint(action);
      if (!isVisible(focusPoint)) {
        setFocus(focusPoint);
      }
    };

    RouterService.register({
      instanceId: 'follow-action',
      callback: function (action) {
        if (isFollowActive() && action.sourceId != ownUserId) {
          handleIncomingAction(action);
        }
      }
    });
  })
;
