angular.module('nuBoard')
  .service('SurfaceService', function (KineticService) {



    this.draw = function (data) {
      console.log('surface service draw');
//      KineticService.draw(data);
    };

    this.newShape = function (data) {
      console.log('surface service new shape');
//      KineticService.newShape(data);
    };

  });