angular.module('nuBoard')
  .service('SurfaceService', function (RouterService) {

    var shapes = {};
    var scope;

    this.init = function () {
      RouterService.register({
        instanceId: 'surface-service',
        callback: function (data) {
          shapes[data.id] = data;
          scope.shapesLog.push(data);
          scope.$emit('shapechange', data);
          scope.$apply();
        }
      });
    };

    this.shareScope = function ($scope) {
      scope = $scope;
    };

  });