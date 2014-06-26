'use strict';

describe('kinetic service', function () {

  var service;

  beforeEach(module('nuBoard'));

  beforeEach(inject(function (_KineticService_) {
    service = _KineticService_;
  }));

  it('build stage', function () {

    var domElement = angular.element('<div></div>')[0];

    var stageConfig = {
      container: domElement, width: 200, height: 200
    };

    service.buildStage(stageConfig);

    expect(true).toBe(true);

//    console.log('kinetic', Kinetic);
//    expect(service.buildStage()).not.toBe(1);
  });

});