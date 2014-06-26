'use strict';

angular.module('nuBoard')
  .service('DistributionService', function (Logger, SurfaceService, FirebaseService) {

    this.draw = function (data) {
      SurfaceService.draw(data);
    };

    this.newShape = function (data) {
      if (data.localOrigin){
        FirebaseService.newShape(data);
      }
      SurfaceService.newShape(data);

    };

  });
