'use strict';

angular.module('nuBoard').service('KineticService', function (KineticShapeFactory) {

  var activeLayer = null;
  var activeShape;

  var that = this;

  this.buildStage = function (config) {
    this.stage = new Kinetic.Stage({
      container: config.container || config.id,
      width: config.width,
      height: config.height
    });
  };

  this.addLayer = function () {
    this.layers = this.layers || [];
    this.layers.push(new Kinetic.Layer());
    this.stage.add(_.last(this.layers));
    activeLayer = _.last(this.layers);
  };

  this.newShape = function (data) {
    if (!activeLayer) {
      that.addLayer();
    }
    var shape = KineticShapeFactory.fromTypeAndConfig(data);
    activeLayer.add(shape);
    activeShape = shape;
    return shape;
  };

  this.draw = function (data) {
    var points = activeShape.points();
    points.push(data.position.x);
    points.push(data.position.y);
    activeShape.setPoints(points);
    this.stage.draw();
  };

  this.getStageContainer = function () {
    return this.stage.container();
  };

});