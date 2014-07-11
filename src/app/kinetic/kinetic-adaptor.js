'use strict';

angular.module('nuBoard')

  .directive('nuKinetic', function () {
    return {
      restrict: 'A',
      replace: false,
      controller: 'KineticCtrl',
      link: function ($scope, $element) {
        $scope.stageContainerId = $element.attr('id');
        console.log('nuKinetic link fn called');
      }
    };
  })

  .controller('KineticCtrl', function ($scope, KineticShapeFactory, KineticShapeCache, KineticSmoothie, $timeout) {
    var activeLayer = null;
    var activeShape;

    var buildStage = function () {
      $scope.stage = KineticShapeFactory.stage({
        container: $scope.stageContainerId,
        width: $scope.width instanceof Function ? $scope.width() : $scope.width,
        height: $scope.height instanceof Function ? $scope.height() : $scope.height
      });

      if ($scope.zoomScale) {
        console.log('setting scale', $scope.zoomScale);
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

      drawStage();

    };

    var extendShape = function (kineticShape, shapeData) {
      var points = shapeData.points;
      points = KineticSmoothie.interpolate(points);
      kineticShape.setPoints(points);
    };

    var newShape = function (data) {
      console.log('new shape');
      if (!activeLayer) {
        console.log('new layer');

        addLayer();
      }

      var shape = KineticShapeFactory.fromTypeAndConfig(data);

      $scope.kineticShapes.put(data.id, shape);

      activeLayer.add(shape);

      return shape;
    };

    $scope.getStageContainer = function () {
      return $scope.stage.container();
    };

    var lastChangePoints = [];

    $scope.$on('shapechange', function (event, shape) {
      if (lastChangePoints != shape.points) {
        //console.debug('shapechange fired', lastChangePoints, shape.points);
        shapeChanged(shape);
        lastChangePoints = shape.points;
      } else {
        //console.log('shapechange event fired without changes on shape points');
      }
    });

  })


;
