'use strict';

angular.module('nuBoard')
    .service('SurfaceWatcherService', function (DistributionService, UUID) {

        var isDraw = false;
        var actionId;

        this.getSupportedEvenets = function () {
            return Object.keys(eventHandlers);
        };

        var actionStart = function () {
            isDraw = true;
            actionId = UUID.generate();
            console.log('action starts', actionId);
        };

        var actionEnd = function () {
            isDraw = false;
        }

        var eventHandlers = {
            'mousedown': function (data) {
                actionStart()
                DistributionService.newLine(data)
            },
            'mouseup': function (data) {
                actionEnd();
            },
            'mousemove': function (data) {
                if (isDraw) {
                    DistributionService.draw(data);
                }
            },
            'mouseout': function(data) {
                actionEnd();
            }
        };


        var prepareData = function (data) {
            var dataCopy = angular.copy(data);
            delete dataCopy.event;
            dataCopy.localOrigin = true;
            return dataCopy;
        };

        this.reportEvent = function (data) {
            var handler = eventHandlers[data.event];
            if (handler) {
                handler(prepareData(data))
            } else {
                console.log('event not supported', data.event);
            }

        }


    })
;