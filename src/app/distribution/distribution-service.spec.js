'use strict';

describe('distribution service', function () {

  var service;

  var fnc = function () {
  };

  var SurfaceServiceMock = {
    draw: fnc,
    newShape: fnc
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

    spyOn(SurfaceServiceMock, 'newShape');

    service.newShape({
      localOrigin: true
    });

    expect(SurfaceServiceMock.newShape).toHaveBeenCalled();
  });

  it('local call redirects to surface service', function () {

    spyOn(SurfaceServiceMock, 'newShape');
    spyOn(FirebaseServiceMock, 'newShape');

    service.newShape({
      type: 'line',
      localOrigin: false
    });

    expect(SurfaceServiceMock.newShape).toHaveBeenCalled();
    expect(FirebaseServiceMock.newShape).not.toHaveBeenCalled();
  });

  it('local call redirects to surface service', function () {

     spyOn(SurfaceServiceMock, 'newShape');
     spyOn(FirebaseServiceMock, 'newShape');

     service.newShape({
       type: 'line',
       localOrigin: true
     });

     expect(SurfaceServiceMock.newShape).toHaveBeenCalled();
     expect(FirebaseServiceMock.newShape).toHaveBeenCalled();
   });

});