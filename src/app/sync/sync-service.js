'use strict';

angular.module('nuBoard')
  .service('SyncService', function (FirebaseService, $rootScope) {

    $rootScope.$watch('boardId', function (newBoardId) {
      FirebaseService.syncWithBoardId(newBoardId);
    });

    this.draw = function (data) {
      FirebaseService.draw(data);
    };
    this.newShape = function (data) {
      FirebaseService.newShape(data);
    };
  })
;