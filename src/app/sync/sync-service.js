'use strict';

angular.module('nuBoard')
  .service('SyncService', function (FirebaseService, $rootScope, RouterService) {

    this.init = function () {
      RouterService.register({
        instanceId: 'sync-service',
        callback: function (data) {
//          FirebaseService.persist(data);
          console.log('send to persistence', data, $rootScope.boardId);
        }
      });
    };

    $rootScope.$watch('boardId', function (newBoardId) {
      FirebaseService.syncWithRootInstanceId(newBoardId);
    });

  });