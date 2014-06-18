'use strict';

angular.module('vxlbrd')
  .directive('stage', ['Logger', '$timeout', function(Logger, $timeout) {
    return {
      restrict: 'E',
      templateUrl: 'app/voxelboard/stageDirective.tpl.html',
      replace: false,
      scope: { config: '=' },
      link: function(scope, element, attrs) {

        var config = scope.config;

        // create a stage and a layer (after directive has finished rendering)
        $timeout(function() {
          var stage = new Kinetic.Stage({
            container: config.id,
            width: config.width,
            height: config.height
          });
          var layer = new Kinetic.Layer();
          stage.add(layer);

          // a flag we use to see if we're dragging the mouse
          var isMouseDown = false;
          // a reference to the line we are currently drawing
          var newline;
          // a reference to the array of points making newline
          var points = [];

          stage.container().addEventListener('mousedown', function() {
            isMouseDown = true;
            points = [];
            points.push(stage.getPointerPosition().x);
            points.push(stage.getPointerPosition().y);
            var line = new Kinetic.Line({
              points: points,
              stroke: 'green',
              strokeWidth: 5,
              lineCap: 'round',
              lineJoin: 'round'
            });
            layer.add(line);
            newline = line;
          });
          stage.container().addEventListener('mouseup', function() {
            isMouseDown = false;
          });
          stage.container().addEventListener('mousemove', function() {
            if (!isMouseDown) {
                return;
            }
            points.push(stage.getPointerPosition().x);
            points.push(stage.getPointerPosition().y);
            newline.setPoints(points);
            stage.draw();
          });
        }, 1);


      },
      controllerAs: 'stageCtrl',
      controller: ['$scope', '$element', function($scope, $element) {

      }]
    };
  }]);
