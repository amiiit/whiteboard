'use strict';

angular.module('vxlbrd')
  .factory('Painter', [function() {

    var paintLine = function(stage, layer) {
      var points = [];
      points.push(stage.getPointerPosition().x);
      points.push(stage.getPointerPosition().y);
      var line = new Kinetic.Line({
        points: points,
        stroke: "green",
        strokeWidth: 5,
        lineCap: 'round',
        lineJoin: 'round'
      });
      layer.add(line);
    };

    return {
      paint: function(stage, layer) {
        stage.container().addEventListener('mousedown', function() {
          paintLine(stage, layer);
        });
        stage.container().addEventListener('mouseup', function() {

        });
      }
    };
  }]);
