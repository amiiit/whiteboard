'use strict';

angular.module('nuBoard')

  .directive('nuKinetic', function () {
    return {
      restrict: 'A',
      replace: false,
      scope: {
        config: '=',
        name: '@name',
        shapes: '&'
      },
      controller: 'KineticCtrl'
    };
  })

  .controller('KineticCtrl', function ($scope, $element, KineticShapeFactory, KineticShapeCache) {
    var activeLayer = null;
    var activeShape;
    var shapes = KineticShapeCache;

    var that = this;

    $scope.buildStage = function (config) {
      $scope.stage = KineticShapeFactory.stage(config);

    };

    $scope.addLayer = function () {
      $scope.layers = $scope.layers || [];
      $scope.layers.push(KineticShapeFactory.layer());
      $scope.stage.add(_.last($scope.layers));
      activeLayer = _.last(this.layers);
    };

    $scope.newShape = function (data) {

      if (!activeLayer) {
        $scope.addLayer();
      }

      var shape = KineticShapeFactory.fromTypeAndConfig(data);

      shapes.put(data.shapeId, shape);

      activeLayer.add(shape);

      $scope.stage.draw();
      return shape;
    };

    $scope.draw = function (data) {
      var shape = shapes.get(data.shapeId);
      var points = data.points;
      shape.setPoints(points);
      $scope.stage.draw();
    };

    $scope.getStageContainer = function () {
      return $scope.stage.container();
    };


  })


;
