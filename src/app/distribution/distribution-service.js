'use strict';

angular.module('nuBoard')
  .service('DistributionService', function (Logger, ToolbarService, SurfaceService) {

    this.draw = function (data) {
      SurfaceService.draw(data);
    };

    this.newShape = function (data) {
      data.toolbarState = ToolbarService.getState();
      SurfaceService.newShape(data);
    };

  });
