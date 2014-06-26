'use strict';

angular.module('nuBoard')
  .service('SurfaceWatcherService', function (DistributionService, UUID) {

    var isDraw = false;
    var actionId;

    this.getSupportedEvents = function () {
      return Object.keys(eventHandlers);
    };

    var actionStart = function (data) {
      isDraw = true;
      actionId = UUID.generate();
      data.actionId = actionId;
    };

    var setActionId = function (data) {
      if (!data.actionId){
        actionId = UUID.generate();
      }
      data.actionId = actionId;
    };

    var resetActionId = function(){
      actionId = undefined;
    };

    var actionEnd = function () {
      isDraw = false;
      actionId = undefined;
    };

    var eventHandlers = {
      'mousedown': function (data) {
        actionStart(data);
        DistributionService.newLine(data)
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
      setActionId(dataCopy);
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