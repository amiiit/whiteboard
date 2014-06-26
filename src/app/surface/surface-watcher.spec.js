describe('test surface watcher', function () {

  beforeEach(module('nuBoard'));

  var fnc = function () {
  };

  var SurfaceWatcherService;

  var DistributionServiceMock = {
    newLine: fnc,
    draw: fnc
  };

  var UUIDMock = {
    generate: fnc
  };

  beforeEach(module(function ($provide) {
    $provide.value('DistributionService', DistributionServiceMock);
    $provide.value('UUID', UUIDMock);
  }));


  beforeEach(function () {
    spyOn(UUIDMock, 'generate').andCallFake(function () {
      var i = 1;
      return 'fake-id-' + i++;
    });

  });

  beforeEach(inject(function (_SurfaceWatcherService_) {
    SurfaceWatcherService = _SurfaceWatcherService_;
  }));


  it('supported events', function () {
    var supportedEvents = SurfaceWatcherService.getSupportedEvents();
    expect(supportedEvents).toContain('mousedown');
    expect(supportedEvents).toContain('mouseup');
    expect(supportedEvents).toContain('mousemove');
    expect(supportedEvents).toContain('mouseout');
  });

  it('reporting mousedown event', function () {

    spyOn(DistributionServiceMock, 'newLine');


    SurfaceWatcherService.reportEvent(
      {
        event: 'mousedown',
        bla: 'bla',
        position: {
          x: 50,
          y: 100
        }
      }
    );

    expect(DistributionServiceMock.newLine).toHaveBeenCalledWith(
      { bla: 'bla',
        position: { x: 50, y: 100 },
        localOrigin: true,
        shapeId: 'fake-id-1'
      });

  });

  it('mousemove after mousedown', function () {

    spyOn(DistributionServiceMock, 'newLine');
    spyOn(DistributionServiceMock, 'draw');

    SurfaceWatcherService.reportEvent(
      {
        event: 'mousedown',
        bla: 'bla',
        position: {
          x: 50,
          y: 100
        }
      }
    );

    SurfaceWatcherService.reportEvent(
      {
        event: 'mousemove',
        bla: 'bla',
        position: {
          x: 51,
          y: 100
        }
      }
    );

    expect(DistributionServiceMock.newLine).toHaveBeenCalledWith({ bla: 'bla',
      position: { x: 50, y: 100 },
      localOrigin: true,
      shapeId: 'fake-id-1'
    });
    expect(DistributionServiceMock.draw).toHaveBeenCalledWith({
      bla: 'bla',
      position: { x: 51, y: 100 },
      localOrigin: true,
      shapeId: 'fake-id-1'

    });


  });

  it('each mouse down new action-id', function () {
    spyOn(DistributionServiceMock, 'newLine');


    SurfaceWatcherService.reportEvent(
      {
        event: 'mousedown',
        bla: 'bla',
        position: {
          x: 50,
          y: 100
        }
      }
    );

    SurfaceWatcherService.reportEvent(
      {
        event: 'mousedown',
        bla: 'bla',
        position: {
          x: 50,
          y: 100
        }
      }
    );

    expect(DistributionServiceMock.newLine.callCount).toBe(2);

    var callArgs = DistributionServiceMock.newLine.argsForCall;
    expect(callArgs[0].shapeId).toBe(callArgs[1].shapeId);

  });


})
;