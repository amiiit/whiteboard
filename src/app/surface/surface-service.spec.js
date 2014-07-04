'use strict';

describe('surface service', function () {

  var fnc = function () {
  };

  var service;
  var KineticServiceMock = {
    draw: fnc,
    newShape: fnc
  };

  beforeEach(module('nuBoard'));

  beforeEach(module(function ($provide) {
    $provide.value('KineticService', KineticServiceMock)
  }));

  beforeEach(inject(function (SurfaceService) {
    service = SurfaceService;
  }));

  xit('Surface service passed shapeId through for draw', function () {

    spyOn(KineticServiceMock, 'draw');

    service.draw({
      shapeId: 'id-1',
      more: 'stuff',
      not: 'important'
    });

    expect(KineticServiceMock.draw.calls.mostRecent().args[0].shapeId).toBe('id-1');

  });

  xit('Surface service passed shapeId through for newShape', function () {

    spyOn(KineticServiceMock, 'newShape');

    service.newShape({
      shapeId: 'id-1',
      more: 'stuff',
      not: 'important'
    });

    expect(KineticServiceMock.newShape.calls.mostRecent().args[0].shapeId).toBe('id-1');

  });

});