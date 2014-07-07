'use strict';

angular.module('nuBoard')
  .service('SyncService', function ($rootScope, RouterService, $firebase, AppConfig) {

    var firebase;
    var rootInstanceId;

    var syncWithRootInstanceId = function (_rootInstanceId) {
      rootInstanceId = _rootInstanceId;
      firebase = $firebase(new Firebase(
          AppConfig.firebase.baseUrl + '/'
          + AppConfig.firebase.appNamespace + '/'
          + _rootInstanceId
      ));

      firebase.$on('child_added', function (a) {
        console.log('firebase child_added', a);
      });

      firebase.$on('child_changed', function (a) {
        console.log('firebase child_changed', a);
      });

    };

    var persist = function (data) {
      var child = firebase.$child(data.id);
      child.$set(data);
    };


    this.init = function () {
      RouterService.register({
        instanceId: 'sync-service',
        callback: function (data) {
          persist(data);
          console.log('send to persistence', data, $rootScope.boardId);
        }
      });
    };

    $rootScope.$watch('boardId', function (newBoardId) {
      syncWithRootInstanceId(newBoardId);
    });


  });