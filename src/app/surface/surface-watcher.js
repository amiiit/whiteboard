'use strict';

angular.module('nuBoard')
  .service('SurfaceWatcherService', function (DistributionService, UUID, ToolbarService) {

    var isDraw = false;
    var localShapeId;

    this.getSupportedEvents = function () {
      return Object.keys(eventHandlers);
    };

    var actionStart = function (data) {
      setNewShapeMeta(data);
      isDraw = true;
      localShapeId = UUID.generate();
      data.shapeId = localShapeId;
    };

    var setNewShapeMeta = function (data) {
      if (!data.shapeId) {
        localShapeId = UUID.generate();
        data.shapeId = localShapeId;
      }
      assignDataWithToolbarProperties(data);
    };

    var positionToPoints = function (data) {
      var points = data.points || [];

      if (data.position) {
        points.push(data.position.x);
        points.push(data.position.y);
      }

      data.points = points;
      delete data.position;
    };

    var assignDataWithToolbarProperties = function (data) {
      var toolbarProps = ToolbarService.getState();
      toolbarProps.type = toolbarProps.stylus;
      delete toolbarProps.stylus;

      for (var key in toolbarProps) {
        if (toolbarProps.hasOwnProperty(key)) {
          data[key] = toolbarProps[key];
        }
      }
    };

    var actionEnd = function () {
      isDraw = false;
      localShapeId = undefined;
    };

    var eventHandlers = {
      'mousedown': function (data) {
        actionStart(data);
        positionToPoints(data);
        DistributionService.newShape(data)
      },
      'mouseup': function (data) {
        actionEnd(data);
      },
      'mousemove': function (data) {
        if (isDraw) {
          data.shapeId = localShapeId;
          var preparedData = prepareData(data);
          DistributionService.draw(preparedData);
        }
      },
      'mouseout': function (data) {
        actionEnd(data);
      }
    };

    var prepareData = function (data) {
      positionToPoints(data);
      var dataCopy = angular.copy(data);
      delete dataCopy.event;
      dataCopy.localOrigin = true;
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