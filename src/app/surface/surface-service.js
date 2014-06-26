angular.module('nuBoard')
  .service('SurfaceService', function (KineticService) {

    this.draw = function (data) {
      KineticService.draw(data);
    };

    this.newLine = function (data) {
      KineticService.newLine(data);
    };

  });