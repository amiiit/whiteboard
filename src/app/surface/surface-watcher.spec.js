describe('test surface watcher', function () {

  beforeEach(module('nuBoard'));

  var fnc = function () {
  };

  var SurfaceWatcherService;

  var DistributionServiceMock = {
    newShape: fnc,
    draw: fnc
  };

  var UUIDMock = {
    generate: fnc
  };

  var ToolbarServiceMock = {
    getState: fnc
  };

  beforeEach(module(function ($provide) {
    $provide.value('DistributionService', DistributionServiceMock);
    $provide.value('UUID', UUIDMock);
    $provide.value('ToolbarService', ToolbarServiceMock);
  }));


  beforeEach(function () {
    spyOn(UUIDMock, 'generate').and.callFake(function () {
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

    spyOn(DistributionServiceMock, 'newShape');


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


    expect(DistributionServiceMock.newShape.calls.mostRecent().args[0]).toEqual(
      jasmine.objectContaining(
        { bla: 'bla',
          position: { x: 50, y: 100 },
          localOrigin: true,
          shapeId: 'fake-id-1'
        }
      ));
  });

  it('mousemove after mousedown', function () {

    spyOn(DistributionServiceMock, 'newShape');
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

    expect(DistributionServiceMock.newShape.calls.mostRecent().args[0]).toEqual(
      jasmine.objectContaining(
        { bla: 'bla',
          position: { x: 50, y: 100 },
          localOrigin: true,
          shapeId: 'fake-id-1'
        }));

    expect(DistributionServiceMock.draw.calls.mostRecent().args[0]).toEqual(
      jasmine.objectContaining({
        bla: 'bla',
        position: { x: 51, y: 100 },
        localOrigin: true,
        shapeId: 'fake-id-1'
      })
    );


  });

  it('each mouse down new action-id', function () {
    spyOn(DistributionServiceMock, 'newShape');


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

    expect(DistributionServiceMock.newShape.calls.count()).toBe(2);

    var callArgs = DistributionServiceMock.newShape.calls.allArgs();
    expect(callArgs[0].shapeId).toBe(callArgs[1].shapeId);

  });


  it('watcher fetches toolbar state for new shape', function () {


    spyOn(ToolbarServiceMock, 'getState').and.returnValue({stylus: 'brush', color: 'green'});

    spyOn(DistributionServiceMock, 'newShape');

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


    expect(ToolbarServiceMock.getState).toHaveBeenCalled();
    expect(DistributionServiceMock.newShape).toHaveBeenCalled();


  })

})
;