'use strict';

describe('distribution service', function () {

  var service;

  var fnc = function () {
  };

  var SurfaceServiceMock = {
    draw: fnc,
    newLine: fnc
  };

  var FirebaseServiceMock = {
    newShape: fnc,
    drawExisting: fnc
  };

  beforeEach(module('nuBoard'));

  beforeEach(module(function ($provide) {
    $provide.value('SurfaceService', SurfaceServiceMock);
    $provide.value('FirebaseService', FirebaseServiceMock);
  }));


  beforeEach(inject(function (_DistributionService_) {
    service = _DistributionService_;
  }));

  it('local call redirects to surface service', function () {

    spyOn(SurfaceServiceMock, 'newLine');

    service.newLine({
      localOrigin: true
    });

    expect(SurfaceServiceMock.newLine).toHaveBeenCalled();
  });

  it('local call redirects to surface service', function () {

    spyOn(SurfaceServiceMock, 'newLine');
    spyOn(FirebaseServiceMock, 'newShape');

    service.newLine({
      localOrigin: true
    });

    expect(SurfaceServiceMock.newLine).toHaveBeenCalled();
  });

});