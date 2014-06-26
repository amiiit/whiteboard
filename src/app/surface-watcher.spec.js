describe('test surface watcher', function () {

  beforeEach(module('nuBoard'));

  var SurfaceWatcherService;
  var DistributionServiceMock = {
    newLine: function () {

    }
  };
  var UUIDMock = {
    generate: function () {
    }
  };

  beforeEach(module(function ($provide) {
    $provide.value('DistributionService', DistributionServiceMock);
    $provide.value('UUID', UUIDMock);
  }));

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
    spyOn(UUIDMock, 'generate').andReturn('random-uuid');

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
        actionId: 'random-uuid'
      });

  });

})
;