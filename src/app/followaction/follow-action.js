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
  .controller('FollowActionCtrl', function (RouterService) {

    console.log('FollowActionCtrl');

    var focusOnAction = function(action){
      console.log('focus on action', action);
    };

    RouterService.register({
      instanceId: 'follow-action',
      callback: function (action) {
        focusOnAction(action);
      }
    });
  })
;
