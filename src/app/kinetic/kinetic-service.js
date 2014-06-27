'use strict';

angular.module('nuBoard').service('KineticService', function (KineticShapeFactory) {

  var activeLayer = null;
  var activeShape;

  var that = this;

  this.buildStage = function (config) {
    that.stage = new Kinetic.Stage({
      container: config.container || config.id,
      width: config.width,
      height: config.height
    });
  };

  this.addLayer = function () {
    that.layers = this.layers || [];
    that.layers.push(new Kinetic.Layer());
    that.stage.add(_.last(this.layers));
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
    that.stage.draw();
  };

  this.getStageContainer = function () {
    return that.stage.container();
  };

});