'use strict';

angular.module('nuBoard')

  .directive('nuKinetic', function () {
    return {
      restrict: 'A',
      replace: false,
      controller: 'KineticCtrl',
      link: function ($scope, $element) {
        $scope.stageContainerId = $element.attr('id');
      }
    };
  })

  .controller('KineticCtrl', function ($scope, KineticShapeFactory, KineticShapeCache, $timeout, AppConfig) {
    var activeLayer = null;

    var buildStage = function () {
      $scope.stage = KineticShapeFactory.stage({
        container: $scope.stageContainerId,
        width: $scope.width instanceof Function ? $scope.width() : $scope.width,
        height: $scope.height instanceof Function ? $scope.height() : $scope.height
      });

      if ($scope.zoomScale) {
        $scope.stage.setScale({x: $scope.zoomScale, y: $scope.zoomScale});
      }
    };

    var bindKinetic = function () {
      $scope.kineticShapes = KineticShapeCache.getCache($scope.stageContainerId);
      buildStage();
      addLayer();
    };

    $timeout(bindKinetic);

    var drawStage = function () {
      $scope.stage.draw();
    };

    var addLayer = function () {
      if (!$scope.stage) {
        buildStage();
      }

      $scope.layers = $scope.layers || [];
      $scope.layers.push(KineticShapeFactory.layer());
      $scope.stage.add(_.last($scope.layers));
      activeLayer = _.last($scope.layers);
    };

    var shapeChanged = function (shape) {
      var shapeData = shape;
      var kineticShape = $scope.kineticShapes.get(shape.id);

      if (!kineticShape) {
        newShape(shapeData);
      } else {
        extendShape(kineticShape, shapeData);
      }

      //todo: draw layer for shape
      drawStage();

    };

    var extendShape = function (kineticShape, shapeData) {
      var points = shapeData.points;
      kineticShape.setPoints(points);
    };

    var isTooManyShapesInActiveLayer = function () {
      return activeLayer.getChildren().toArray().length > AppConfig.kinetic.maxShapesInActiveLayer;
    };

    var newShape = function (data) {
      //check if activeLayer is full and add new layer accordingly
      if (!activeLayer || isTooManyShapesInActiveLayer()) {
        addLayer();
        console.log('adding layer');
      }

      var shape = KineticShapeFactory.fromTypeAndConfig(data);

      $scope.kineticShapes.put(data.id, shape);

      activeLayer.add(shape);

      return shape;
    };

    $scope.getStageContainer = function () {
      return $scope.stage.container();
    };

    $scope.$on('shapechange', function (event, shape) {
      shapeChanged(shape);
    });

  })


;
