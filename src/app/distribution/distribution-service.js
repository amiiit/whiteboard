'use strict';

angular.module('nuBoard')
  .service('DistributionService', function (Logger, SurfaceService, SyncService, UUID) {

    this.draw = function (data) {
      if (data.localOrigin){
        SyncService.draw(data);
      }
      SurfaceService.draw(data);
    };

    this.newShape = function (data) {
      if (data.localOrigin){
        data.id = UUID.generate();
        SyncService.newShape(data);
      }
      SurfaceService.newShape(data);

    };

  });
