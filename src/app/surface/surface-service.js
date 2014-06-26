angular.module('nuBoard')
  .service('SurfaceService', function (KineticService) {

    this.draw = function (data) {
      KineticService.draw(data);
    };

    this.newShape = function (data) {
      KineticService.newShape(data);
    };

  });