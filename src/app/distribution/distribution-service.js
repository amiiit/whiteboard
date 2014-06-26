'use strict';

angular.module('nuBoard')
  .service('DistributionService', function (Logger, ToolbarService, SurfaceService) {

    this.draw = function (data) {
      SurfaceService.draw(data);
    };

    this.newLine = function (data) {
      data.toolbarState = ToolbarService.getState();
      SurfaceService.newLine(data);
    };

  });
