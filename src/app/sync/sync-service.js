'use strict';

angular.module('nuBoard')
  .service('SyncService', function (FirebaseService) {
    this.draw = function (data) {
      FirebaseService.draw(data);
    };
    this.newShape = function (data) {
      FirebaseService.newShape(data);
    };
  })
;