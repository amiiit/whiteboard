'use strict';

angular.module('nuBoard')
  .service('SyncService', function (FirebaseService, $rootScope) {

    $rootScope.$watch('boardId', function (newBoardId) {
      FirebaseService.syncWithBoardId(newBoardId);
    });

    FirebaseService.setHandler('new_shape', function (data) {
      console.log('sync service new shape');
    });

    FirebaseService.setHandler('amended_shape', function (data) {
      console.log('sync service amend shape');
    });

    this.draw = function (data) {
      FirebaseService.draw(data);
    };
    this.newShape = function (data) {
      FirebaseService.newShape(data);
    };
  })
;