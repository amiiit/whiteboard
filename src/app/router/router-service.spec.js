'use strict';

describe('router service', function () {

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

  var RouterShapeCacheMock = {
    put: fnc,
    get: fnc
  };

  var AppConfig;


  beforeEach(module('nuBoard'));

  beforeEach(module(function ($provide) {
    $provide.value('SurfaceService', SurfaceServiceMock);
    $provide.value('SyncService', SyncServiceMock);
    $provide.value('UUID', UUIDMock);
    $provide.value('RouterShapeCache', RouterShapeCacheMock);
  }));


  beforeEach(inject(function (_RouterService_, _AppConfig_) {
    service = _RouterService_;
    AppConfig = _AppConfig_;
    AppConfig.syncActive = true;
  }));

  xit('local call redirects to surface service', function () {

    spyOn(SurfaceServiceMock, 'newShape');

    service.newShape({
      localOrigin: true,
      points: []
    });

    expect(SurfaceServiceMock.newShape).toHaveBeenCalled();
  });

  xit('local call redirects to surface service and not to syncservice', function () {

    spyOn(SurfaceServiceMock, 'newShape');
    spyOn(SyncServiceMock, 'newShape');

    service.newShape({
      type: 'line',
      localOrigin: false,
      points: []
    });

    expect(SurfaceServiceMock.newShape).toHaveBeenCalled();
    expect(SyncServiceMock.newShape).not.toHaveBeenCalled();
  });

  xit('local call redirects to surface service', function () {

    spyOn(SurfaceServiceMock, 'newShape');
    spyOn(SyncServiceMock, 'newShape');

    service.newShape({
      type: 'line',
      localOrigin: true,
      points: []
    });

    expect(SurfaceServiceMock.newShape).toHaveBeenCalled();
    expect(SyncServiceMock.newShape).toHaveBeenCalled();
  });

  xit('local draw to sync and surface', function () {

    spyOn(SurfaceServiceMock, 'draw');
    spyOn(SyncServiceMock, 'draw');

    spyOn(RouterShapeCacheMock, 'get').and.returnValue({
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

  xit('remote draw to surface only', function () {

    spyOn(SurfaceServiceMock, 'draw');
    spyOn(SyncServiceMock, 'draw');

    spyOn(RouterShapeCacheMock, 'get').and.returnValue({
      points: [0, 10]
    });

    service.draw({
      type: 'line',
      points: [0, 10]
    });

    expect(SurfaceServiceMock.draw).toHaveBeenCalled();
    expect(SyncServiceMock.draw).not.toHaveBeenCalled();
  });

  xit('Sync server get shapeId of local shapes', function () {

    spyOn(SyncServiceMock, 'draw');
    spyOn(SyncServiceMock, 'newShape');

    var i = 1;

    spyOn(UUIDMock, 'generate').and.callFake(function () {
      return 'fake-id-' + i++;
    });

    spyOn(RouterShapeCacheMock, 'get').and.returnValue({
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