'use strict';

angular.module('nuBoard')
  .service('DistributionService', function (Logger, SurfaceService, SyncService) {

    this.draw = function (data) {
      SurfaceService.draw(data);
    };

    this.newShape = function (data) {
      if (data.localOrigin){
        SyncService.newShape(data);
      }
      SurfaceService.newShape(data);

    };

  });
