'use strict';

describe('kinetic service', function () {

  var fnc = function () {
  };

  var domElement;
  var service;

  var KineticShapeFactory = {
    fromTypeAndConfig: fnc
  };

  beforeEach(module('nuBoard'));

  beforeEach(inject(function (_KineticService_) {
    service = _KineticService_;
    domElement = angular.element('<div></div>')[0];

  }));

  it('build stage', function () {


    var stageConfig = {
      container: domElement, width: 200, height: 200
    };

    service.buildStage(stageConfig);

    expect(service.stage instanceof Kinetic.Stage).toBe(true);

  });

  it('new shape', function () {

    spyOn(KineticShapeFactory,'fromTypeAndConfig');

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

  })

});