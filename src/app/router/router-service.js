'use strict';

angular.module('nuBoard')
  .service('RouterService', function (Logger, SurfaceService, SyncService, RouterShapeCache, AppConfig) {

    var syncActive = AppConfig.syncActive;
    var shapes = RouterShapeCache;
    var localShapeIds = [];
    var that = this;

    this.report = function(data){
      console.log('got report', data);
    };

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
      console.log('new shape', data.shapeId, data.localOrigin == true);
      if (!data.points) {
        console.log('data no points', data.shapeId);
        return;
      }

      shapes.put(data.shapeId, data);
      if (data.localOrigin && syncActive) {
        localShapeIds.push(data.shapeId);
        SyncService.newShape(data);
      }
      SurfaceService.newShape(data);
    };

  });