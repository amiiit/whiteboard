'use strict';

angular.module('nuBoard')
  .service('DistributionService', function (Logger, SurfaceService, SyncService, UUID) {

    var lastLocalShapeId;

    this.draw = function (data) {
      if (data.localOrigin) {
        data.shapeId = lastLocalShapeId;
        SyncService.draw(data);
      }
      SurfaceService.draw(data);
    };

    var setLocalShapeId = function (data) {
      lastLocalShapeId = data.shapeId = UUID.generate();
    };

    this.newShape = function (data) {
      if (data.localOrigin) {
        setLocalShapeId(data);
        SyncService.newShape(data);
      }
      SurfaceService.newShape(data);
    };

  });
