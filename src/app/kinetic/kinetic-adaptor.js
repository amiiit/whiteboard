'use strict';

angular.module('nuBoard')

  .directive('nu-kinetic', function (Logger, KineticService) {
    return {
      restrict: 'A',
      replace: false,
      scope: {
        config: '=',
        name: '@name'
      },
      controller: 'KineticCtrl'
    };
  })

  .controller('KineticCtrl', function ($scope, $element) {

  })

  .service('KineticService', function () {

    var activeLayer = null;
    var activeShape;

    this.buildStage = function (config) {
      this.stage = new Kinetic.Stage({
        container: config.id,
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

      var toolbarState = data.toolbarState;

      var line = new Kinetic.Line({
        points: [data.position.x, data.position.y],
        stroke: toolbarState.color,
        strokeWidth: toolbarState.width,
        lineCap: toolbarState.lineCap,
        lineJoin: toolbarState.lineJoin
      });

      activeLayer.add(line);
      activeShape = line;
      return line;
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

  })
;
