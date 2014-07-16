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
      drawStage();
    };

    $timeout(bindKinetic);

    var drawStage = function () {
      var stage = $scope.stage;
      stage.draw();
    };

    var drawShape = function (shape) {
      shape.draw();
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
        kineticShape = newShape(shapeData);
      } else {
        extendShape(kineticShape, shapeData);
      }

      drawShape(kineticShape);
    };

    var extendShape = function (kineticShape, shapeData) {
      var points = shapeData.points;
      kineticShape.setPoints(points);
    };

    var isTooManyShapesInActiveLayer = function () {
      return false; //activeLayer.children.length > AppConfig.kinetic.maxShapesInActiveLayer;
    };

    var mergeBackgroundLayers = function () {
      var allShapes = [];
      _.forEach($scope.layers, function (layer) {
        if (layer !== activeLayer) {
          allShapes.push(layer.children.toArray());
          layer.destroy();
        }
      });

      var newBackgroundLayer = KineticShapeFactory.layer();
      _.forEach(_.flatten(allShapes), function(shape){
        newBackgroundLayer.add(shape);
      });
      $scope.stage.add(newBackgroundLayer);
      newBackgroundLayer.moveToBottom();
      $scope.layers = [newBackgroundLayer, activeLayer];

      console.log('layers after merge', $scope.layers);


      drawStage();
    };

    var newShape = function (data) {
      if (!activeLayer || isTooManyShapesInActiveLayer()) {
        addLayer();
        mergeBackgroundLayers();
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
