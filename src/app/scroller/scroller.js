'use strict';

angular.module('nuBoard')
  .directive('nuWindowScroller', function () {
    return {
      restrict: 'E',
      scope: {
        width: '&',
        height: '&',
        relativeFocus: '='
      },
      controller: 'ScrollerCtrl',
      link: function ($scope) {
        $scope.body = angular.element(document).find('body')[0];
      }
    }
  })
  .controller('ScrollerCtrl', function ($scope, BoardUtils) {

    $scope.$watch('relativeFocus', function (focus) {

      var viewport = BoardUtils.viewport();

      var surfaceDimensions = {width: $scope.width(), height: $scope.height()};
      console.log('viewport', viewport);
      console.log('focus', focus);

      var pointToCenter = {
        x: surfaceDimensions.width * focus.x,
        y: surfaceDimensions.height * focus.y
      };

      console.log('pointToCenter', pointToCenter);

      var matchingScreenEdge = {
        x: pointToCenter.x - viewport.width / 2,
        y: pointToCenter.y - viewport.height / 2
      };

      console.log('matchingScreenEdge', matchingScreenEdge);

      var scrollTo = {
        x: Math.max(matchingScreenEdge.x, 0),
        y: Math.max(matchingScreenEdge.y, 0)
      };

      console.log('scrolling to', scrollTo);
      window.scrollTo(scrollTo.x, scrollTo.y);
    });
  })
;