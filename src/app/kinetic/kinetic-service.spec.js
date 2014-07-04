'use strict';

describe('kinetic service', function () {

  var fnc = function () {
  };

  var layerStage = function () {
    return {
      draw: fnc,
      add: fnc
    }
  };

  var domElement;
  var service;

  var KineticShapeFactoryMock = {
    fromTypeAndConfig: fnc,
    stage: layerStage,
    layer: layerStage
  };
  var KineticShapeCacheMock = {
    put: fnc,
    get: fnc
  };

  beforeEach(module('nuBoard'));

  beforeEach(module(function ($provide) {
    $provide.value('KineticShapeCache', KineticShapeCacheMock);
    $provide.value('KineticShapeFactory', KineticShapeFactoryMock);
  }));

  beforeEach(inject(function (_KineticService_) {
    service = _KineticService_;
    domElement = angular.element('<div></div>')[0];

  }));

  xit('build stage', function () {

    spyOn(KineticShapeFactoryMock, 'stage');

    var stageConfig = {
      container: domElement, width: 200, height: 200
    };

    service.buildStage(stageConfig);

    expect(KineticShapeFactoryMock.stage.calls.mostRecent().args[0]).toBe(stageConfig);

  });

  xit('new shape', function () {

    spyOn(KineticShapeFactoryMock, 'fromTypeAndConfig').and.returnValue({dummy: 'shape', shapeId: 'test-1'});

    var stageConfig = {
      container: domElement, width: 200, height: 200
    };

    service.buildStage(stageConfig);

    service.newShape({
      type: 'line',
      points: [10, 10],
      stroke: 'green',
      strokeWidth: 5,
      lineCap: 'round',
      lineJoin: 'round',
      name: 'dummy-shape'
    });

  });

  xit('new shapes are put in the cache', function () {

    var dummyShape = {dummy: 'shape', shapeId: 'test-1'};
    spyOn(KineticShapeFactoryMock, 'fromTypeAndConfig').and.callFake(function (data) {
      return dummyShape;
    });
    spyOn(KineticShapeCacheMock, 'put');

    var stageConfig = {
      container: domElement, width: 200, height: 200
    };

    service.buildStage(stageConfig);

    service.newShape({
      shapeId: 'bla-id',
      type: 'line',
      points: [10, 10],
      stroke: 'green',
      strokeWidth: 5,
      lineCap: 'round',
      lineJoin: 'round'
    });

    expect(KineticShapeCacheMock.put).toHaveBeenCalled();
    expect(KineticShapeCacheMock.put.calls.mostRecent().args[0]).toBe('bla-id');
    expect(KineticShapeCacheMock.put.calls.mostRecent().args[1]).toBe(dummyShape);

  });

  xit('draw objects are retrieved from cache', function () {

    var dummyShape = {
      dummy: 'shape',
      points: function () {
        return []
      },
      setPoints: fnc
    };
    spyOn(KineticShapeFactoryMock, 'fromTypeAndConfig').and.returnValue(dummyShape);
    spyOn(KineticShapeCacheMock, 'put');
    spyOn(KineticShapeCacheMock, 'get').and.returnValue(dummyShape);
    spyOn(KineticShapeFactoryMock, 'stage').and.returnValue({
      add: fnc,
      draw: fnc
    });
    spyOn(KineticShapeFactoryMock, 'layer').and.returnValue({
      add: fnc
    });

    var stageConfig = {
      container: domElement, width: 200, height: 200
    };

    service.buildStage(stageConfig);

    service.draw({
      shapeId: 'bla-id',
      position: {x: 11, y: 10}
    });

    expect(KineticShapeCacheMock.get).toHaveBeenCalled();

  })

});