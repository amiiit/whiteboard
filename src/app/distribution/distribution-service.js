'use strict';

angular.module('nuBoard')
  .service('DistributionService', function (Logger, SurfaceService, SyncService, DistributionShapeCache) {

    var shapes = DistributionShapeCache;

    this.draw = function (data) {
      var shape = shapes.get(data.shapeId);

      for (var i = 0; i < data.points.length; i++) {
        shape.points.push(data.points[i]);
      }

      if (data.localOrigin) {
        SyncService.draw(shape);
      }

      SurfaceService.draw(shape);
    };

    this.newShape = function (data) {
      shapes.put(data.shapeId, data);
      if (data.localOrigin) {
        SyncService.newShape(data);
      }
      SurfaceService.newShape(data);
    };

  });
