'use strict';

angular.module('nuBoard')
  .service('SurfaceWatcherService', function (DistributionService, UUID, ToolbarService) {

    var isDraw = false;
    var shapeId;

    this.getSupportedEvents = function () {
      return Object.keys(eventHandlers);
    };

    var actionStart = function (data) {
      isDraw = true;
      shapeId = UUID.generate();
      data.shapeId = shapeId;
    };

    var setNewShapeMeta = function (data) {
      if (!data.shapeId){
        shapeId = UUID.generate();
      }
      data.toolbarState = ToolbarService.getState();
      data.shapeId = shapeId;
    };

    var actionEnd = function () {
      isDraw = false;
      shapeId = undefined;
    };

    var eventHandlers = {
      'mousedown': function (data) {
        actionStart(data);
        DistributionService.newShape(data)
      },
      'mouseup': function (data) {
        actionEnd(data);
      },
      'mousemove': function (data) {
        if (isDraw) {
          var preparedData = prepareData(data);
          DistributionService.draw(preparedData);
        }
      },
      'mouseout': function (data) {
        actionEnd(data);
      }
    };


    var prepareData = function (data) {
      var dataCopy = angular.copy(data);
      delete dataCopy.event;
      dataCopy.localOrigin = true;
      setNewShapeMeta(dataCopy);
      return dataCopy;
    };

    this.reportEvent = function (data) {
      var handler = eventHandlers[data.event];
      if (handler) {
        var preparedData = prepareData(data);
        handler(preparedData);
      } else {
        console.log('event not supported', data.event);
      }

    }


  })
;