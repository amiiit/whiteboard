'use strict';

angular.module('nuBoard')
  .service('DistributionService', function (Logger, SurfaceService, SyncService, DistributionShapeCache) {

    var shapes = DistributionShapeCache;
    var that = this;

    SyncService.setHandler('new_shape', function (data) {
      that.newShape(data);
    });

    SyncService.setHandler('amended_shape', function (data) {
      that.draw(data);
    });

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
