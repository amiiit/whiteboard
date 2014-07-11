'use strict';

angular.module('nuBoard')
  .directive('nuWindowScroller', function () {
    return {
      restrict: 'E',
      scope: {
        width: '&',
        height: '&',
        relativeFocus: '=',
        currentViewport: '=',
        targetOffset: '='
      },
      controller: 'ScrollerCtrl',
      link: function ($scope) {

        $scope.body = angular.element(document).find('body')[0];

        angular.element(document).bind('scroll', function (e) {
          $scope.$apply(function () {
            $scope.updateViewportMark({
              x: window.pageXOffset,
              y: window.pageYOffset
            });
          });
        });

      }
    }
  })
  .controller('ScrollerCtrl', function ($scope, BoardUtils) {

    $scope.$watch('relativeFocus', function (focus) {

      var viewport = BoardUtils.viewport();
      var surfaceDimensions = {width: $scope.width(), height: $scope.height()};
      var pointToCenter = {
        x: surfaceDimensions.width * focus.x,
        y: surfaceDimensions.height * focus.y
      };
      var matchingScreenEdge = {
        x: pointToCenter.x - viewport.width / 2,
        y: pointToCenter.y - viewport.height / 2
      };
      var scrollTo = {
        x: Math.max(matchingScreenEdge.x, 0),
        y: Math.max(matchingScreenEdge.y, 0)
      };
      window.scrollTo(scrollTo.x, scrollTo.y);
    });

    $scope.updateViewportMark = function (currentScrollPosition) {

      console.log('1currentScrollPosition', currentScrollPosition);

      var viewport = BoardUtils.viewport();

      console.log('viewport', viewport);

      var surfaceDimensions = {width: $scope.width(), height: $scope.height()};

      var relativePointA = {
        x: currentScrollPosition.x / surfaceDimensions.width,
        y: currentScrollPosition.y / surfaceDimensions.height
      };

      var relativePointB = {
        x: (currentScrollPosition.x + viewport.width - $scope.targetOffset.left) / surfaceDimensions.width,
        y: (currentScrollPosition.y + viewport.height - $scope.targetOffset.top) / surfaceDimensions.height
      };

      console.log('current offset:', $scope.targetOffset);
      $scope.currentViewport = {
        upperLeft: relativePointA,
        lowerRight: relativePointB
      };
    };
  })
;