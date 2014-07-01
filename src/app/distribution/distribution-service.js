'use strict';

angular.module('nuBoard')
  .service('DistributionService', function (Logger, SurfaceService, SyncService, DistributionShapeCache, AppConfig) {

    var syncActive = AppConfig.syncActive;
    var shapes = DistributionShapeCache;
    var localShapeIds = [];
    var that = this;

    SyncService.setHandler('new_shape', function (data) {
      that.newShape(data);
    });

    SyncService.setHandler('amended_shape', function (data) {
      if (!_.contains(localShapeIds, data.shapeId)) {
        that.draw(data);
      }
    });

    this.draw = function (data) {

      var shape = shapes.get(data.shapeId);


      if (data.localOrigin && syncActive) {
        SyncService.draw(shape);
        shape.points.push(data.points[0]);
        shape.points.push(data.points[1]);
      } else {
        shape.points = data.points;
      }

      SurfaceService.draw(shape);
    };

    this.newShape = function (data) {
      shapes.put(data.shapeId, data);
      if (data.localOrigin && syncActive) {
        localShapeIds.push(data.shapeId);
        SyncService.newShape(data);
      }
      SurfaceService.newShape(data);
    };

  });
