'use strict';

angular.module('nuBoard')
  .service('SyncService', function ($rootScope, RouterService, $firebase, AppConfig) {

    var firebase;
    var rootInstanceId;
    var routerReport;

    var syncWithRootInstanceId = function (_rootInstanceId) {
      rootInstanceId = _rootInstanceId;
      firebase = $firebase(new Firebase(
          AppConfig.firebase.baseUrl + '/'
          + AppConfig.firebase.appNamespace + '/'
          + _rootInstanceId
      ));

      firebase.$on('child_added', function (a) {
        reportChildToRouter(a);
      });

      firebase.$on('child_changed', function (a) {
        reportChildToRouter(a);
      });

    };

    var reportChildToRouter = function (child) {
      RouterService.report({
        message: child.snapshot.value,
        sourceId: 'sync-service'
      })
    };

    var persist = function (data) {
      if (!data.id) {
        console.error('persisting data not containing id', data);
      }
      var child = firebase.$child(data.id);
      child.$set(data);
    };

    this.init = function () {
      routerReport = RouterService.register({
        instanceId: 'sync-service',
        callback: function (data) {
          persist(data);
        }
      });
      $rootScope.$watch('boardId', function (newBoardId) {
        syncWithRootInstanceId(newBoardId);
      });
    };


  });
