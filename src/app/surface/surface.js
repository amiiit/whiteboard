'use strict';

angular.module('nuBoard')
  .directive('nuSurface', function (Logger, UUID, $timeout, KineticService, SurfaceWatcherService) {
    return {
      restrict: 'E',
      templateUrl: 'app/surface/surface.tpl.html',
      replace: true,
      scope: {
        width: '&',
        height: '&',
        surfaceId: '@'
      },
      link: function ($scope, element, attrs) {

        var registerEventsWithSurfaceWatcher = function () {
          angular.forEach(
            SurfaceWatcherService.getSupportedEvents(),
            function (supportedEvent) {
              KineticService.getStageContainer().addEventListener(supportedEvent,
                function () {
                  SurfaceWatcherService.reportEvent(
                    {
                      event: supportedEvent,
                      position: KineticService.stage.getPointerPosition()
                    }
                  )
                })
            }
          );
        };


        var linkOnDom = function () {

          KineticService.buildStage({
            width: $scope.width(),
            height: $scope.height(),
            id: $scope.surfaceId
          });

          KineticService.addLayer();

          registerEventsWithSurfaceWatcher();

        };

        var unregisterWatch = $scope.$watch('surfaceId', function () {
//          linkOnDom();
          unregisterWatch();
        });

      },
      controller: 'SurfaceCtrl'
    };
  }
)
  .controller('SurfaceCtrl', function ($scope) {


  });
