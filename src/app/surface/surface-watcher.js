'use strict';

angular.module('nuBoard')

  .directive('nuWatchSurface', function ($timeout, DistributionService, UUID, ToolbarService) {
    return {
      link: function ($scope, $element) {
        console.log('link element', $element);
        var eventHandlers = {
          'mousedown': function (data) {
            console.log('mousedown', data);
//            actionStart(data);
//            positionToPoints(data);
//            DistributionService.newShape(data)
          },
          'mouseup': function (data) {
            console.log('mouseup', data);
//            actionEnd(data);
          },
          'mousemove': function (data) {
            console.log('mousemove', data);

//            if (isDraw) {
//              data.shapeId = localShapeId;
//              var preparedData = prepareData(data);
//              DistributionService.draw(preparedData);
//            }
          },
          'mouseout': function (data) {
            console.log('mouseout', data);
//            actionEnd(data);
          }
        };

        _.each(Object.keys(eventHandlers), function (eventName) {
          $element.on(eventName, eventHandlers[eventName])
        });

      },
      controller: function ($scope) {

        $timeout(function () {
          var isDraw = false;
          var localShapeId;

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


          var prepareData = function (data) {
            positionToPoints(data);
            var dataCopy = angular.copy(data);
            delete dataCopy.event;
            dataCopy.localOrigin = true;
            return dataCopy;
          };

          $scope.reportEvent = function (data) {
            var handler = eventHandlers[data.event];
            if (handler) {
              var preparedData = prepareData(data);
              handler(preparedData);
            } else {
              console.log('event not supported', data.event);
            }
          }
        });
      }
    }
  })

  .service('SurfaceWatcherService', function () {


  })
;