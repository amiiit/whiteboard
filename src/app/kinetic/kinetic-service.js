'use strict';

angular.module('nuBoard').service('KineticService', function (KineticShapeFactory, KineticShapeCache) {

  var activeLayer = null;
  var activeShape;
  var shapes = KineticShapeCache;

  var that = this;

  this.buildStage = function (config) {
    that.stage = KineticShapeFactory.stage(config);
  };

  this.addLayer = function () {
    that.layers = this.layers || [];
    that.layers.push(KineticShapeFactory.layer());
    that.stage.add(_.last(this.layers));
    activeLayer = _.last(this.layers);
  };

  this.newShape = function (data) {

    if (!activeLayer) {
      that.addLayer();
    }

    var shape = KineticShapeFactory.fromTypeAndConfig(data);
    shapes.put(data.shapeId, shape);
    activeLayer.add(shape);
    activeShape = shape;
    return shape;
  };

  this.draw = function (data) {
    var points = activeShape.points();
    points.push(data.position.x);
    points.push(data.position.y);
    activeShape.setPoints(points);
    that.stage.draw();
  };

  this.getStageContainer = function () {
    return that.stage.container();
  };

});