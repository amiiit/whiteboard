'use strict';

angular.module('nuBoard')
    .directive('nuSurface', function (Logger, UUID, $timeout, KineticService, SurfaceWatcherService) {
        return {
            restrict: 'E',
            templateUrl: 'app/surface.tpl.html',
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
                }


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
                    linkOnDom();
                    unregisterWatch();
                });

            },
            controller: 'SurfaceCtrl'
        };
    }
)
    .
    controller('SurfaceCtrl', function ($scope) {


        var objects = {};

        this.addLine = function (id, controlData) {
            objects[id] = $scope.kinetic.line.new(controlData.points);
            Logger.debug('surfaceDirective :: SurfaceCtrl :: addLine :: objects', objects);
        };

        this.drawLine = function (id, controlData) {
            if (!objects[id]) {
                Logger.log('ERROR :: surfaceDirective :: SurfaceCtrl :: drawLine :: no object with id ' + id + ' available');
                return;
            }
            $scope.kinetic.line.draw(objects[id], controlData.points);
        };
    })
;
