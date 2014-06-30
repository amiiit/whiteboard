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
    draw: fnc
  };

  var UUIDMock = {
    generate: fnc
  };

  beforeEach(module('nuBoard'));

  beforeEach(module(function ($provide) {
    $provide.value('SurfaceService', SurfaceServiceMock);
    $provide.value('SyncService', SyncServiceMock);
    $provide.value('UUID', UUIDMock);
  }));


  beforeEach(inject(function (_DistributionService_) {
    service = _DistributionService_;
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

    service.draw({
      type: 'line',
      localOrigin: true
    });

    expect(SurfaceServiceMock.draw).toHaveBeenCalled();
    expect(SyncServiceMock.draw).toHaveBeenCalled();
  });

  it('remote draw to surface only', function () {

    spyOn(SurfaceServiceMock, 'draw');
    spyOn(SyncServiceMock, 'draw');

    service.draw({
      type: 'line'
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