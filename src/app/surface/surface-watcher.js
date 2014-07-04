'use strict';

angular.module('nuBoard')

  .directive('nuWatchSurface', function ($timeout, RouterService, UUID, ToolbarService) {
    return {
      link: function ($scope, $element) {

        var isDraw = false;
        var localShapeId;

        var informScopeOfChange = function () {
          $scope.$apply();
          $scope.$emit('shapechange', localShapeId);
        };

        var actionStart = function (eventData) {

          if (!eventData) {
            return;
          }
          isDraw = true;

          var actionData = {
            shapeId: UUID.generate(),
            points: positionToPoint(eventData)
          };

          assignDataWithToolbarProperties(actionData);
          localShapeId = actionData.shapeId;
          $scope.shapes[actionData.shapeId] = actionData;
          informScopeOfChange();
        };

        var positionToPoint = function (position) {
          return [position.layerX, position.layerY];
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

        var actionProceed = function (eventData) {
          var shape = $scope.shapes[localShapeId];
          if (!shape) {
            console.warn('no shape found to continue', localShapeId);
            return;
          }
          var point = positionToPoint(eventData);
          shape.points.push(point[0]);
          shape.points.push(point[1]);
          informScopeOfChange();
        };

        var eventHandlers = {
          'mousedown': function (data) {
            actionStart(data);
          },
          'mouseup': function (data) {
            actionEnd(data);
          },
          'mousemove': function (data) {
            if (isDraw) {
              actionProceed(data);
            }
          },
          'mouseout': function (data) {
            actionEnd(data);
          }
        };

        _.each(Object.keys(eventHandlers), function (eventName) {
          $element.on(eventName, eventHandlers[eventName])
        });

      },
      controller: function ($scope) {

      }
    }
  })

  .service('SurfaceWatcherService', function () {


  })
;