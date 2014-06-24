'use strict';

angular.module('nuBoard')
    .service('captureService', function (Logger, UUID, DistributionService) {
        var activeTool = 'pen';
        this.startAction = function (points) {
            var id = UUID.new();
            DistributionService.add(activeTool, id, {points: points});
            return id;
        };

        this.feedAction = function (id, points) {
            DistributionService.render(activeTool, id, {points: points});
        };

        this.endAction = function () {

        };

        this.setTool = function (tool) {
            activeTool = tool;
        }
    })
;
