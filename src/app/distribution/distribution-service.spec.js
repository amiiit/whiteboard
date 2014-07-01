'use strict';

describe('distribution service', function () {

  var service;

  var fnc = function () {
  };

  var SurfaceServiceMock = {
    draw: fnc,
    newShape: fnc
  };

  var SyncServiceMock = {
    newShape: fnc,
    draw: fnc,
    setHandler: fnc
  };

  var UUIDMock = {
    generate: fnc
  };

  var DistributionShapeCacheMock = {
    put: fnc,
    get: fnc
  };

  var AppConfig;


  beforeEach(module('nuBoard'));

  beforeEach(module(function ($provide) {
    $provide.value('SurfaceService', SurfaceServiceMock);
    $provide.value('SyncService', SyncServiceMock);
    $provide.value('UUID', UUIDMock);
    $provide.value('DistributionShapeCache', DistributionShapeCacheMock);
  }));


  beforeEach(inject(function (_DistributionService_, _AppConfig_) {
    service = _DistributionService_;
    AppConfig = _AppConfig_;
    AppConfig.syncActive = true;
  }));

  it('local call redirects to surface service', function () {

    spyOn(SurfaceServiceMock, 'newShape');

    service.newShape({
      localOrigin: true
    });

    expect(SurfaceServiceMock.newShape).toHaveBeenCalled();
  });

  it('local call redirects to surface service and not to syncservice', function () {

    spyOn(SurfaceServiceMock, 'newShape');
    spyOn(SyncServiceMock, 'newShape');

    service.newShape({
      type: 'line',
      localOrigin: false
    });

    expect(SurfaceServiceMock.newShape).toHaveBeenCalled();
    expect(SyncServiceMock.newShape).not.toHaveBeenCalled();
  });

  it('local call redirects to surface service', function () {

    spyOn(SurfaceServiceMock, 'newShape');
    spyOn(SyncServiceMock, 'newShape');

    service.newShape({
      type: 'line',
      localOrigin: true
    });

    expect(SurfaceServiceMock.newShape).toHaveBeenCalled();
    expect(SyncServiceMock.newShape).toHaveBeenCalled();
  });

  it('local draw to sync and surface', function () {

    spyOn(SurfaceServiceMock, 'draw');
    spyOn(SyncServiceMock, 'draw');

    spyOn(DistributionShapeCacheMock, 'get').and.returnValue({
      points: [0, 10]
    });

    service.draw({
      type: 'line',
      points: [10, 10],
      localOrigin: true
    });

    expect(SurfaceServiceMock.draw).toHaveBeenCalled();
    expect(SyncServiceMock.draw).toHaveBeenCalled();
  });

  it('remote draw to surface only', function () {

    spyOn(SurfaceServiceMock, 'draw');
    spyOn(SyncServiceMock, 'draw');

    spyOn(DistributionShapeCacheMock, 'get').and.returnValue({
      points: [0, 10]
    });

    service.draw({
      type: 'line',
      points: [0, 10]
    });

    expect(SurfaceServiceMock.draw).toHaveBeenCalled();
    expect(SyncServiceMock.draw).not.toHaveBeenCalled();
  });

  it('Sync server get shapeId of local shapes', function () {

    spyOn(SyncServiceMock, 'draw');
    spyOn(SyncServiceMock, 'newShape');

    var i = 1;

    spyOn(UUIDMock, 'generate').and.callFake(function () {
      return 'fake-id-' + i++;
    });

    spyOn(DistributionShapeCacheMock, 'get').and.returnValue({
      points: [0, 10]
    });


    service.newShape({
      localOrigin: true,
      type: 'line',
      more: 'stuff'
    });

    service.draw({
      localOrigin: true,
      points: 'more points and stuff that doesnt matter here'
    });


  });

});