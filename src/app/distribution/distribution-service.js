'use strict';

angular.module('nuBoard')
  .service('DistributionService', function (Logger, SurfaceService, SyncService, UUID) {

    var lastLocalShapeId;

    this.draw = function (data) {
      if (data.localOrigin) {
        SyncService.draw(data);
        data.shapeId = lastLocalShapeId
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
