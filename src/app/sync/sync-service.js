'use strict';

angular.module('nuBoard')
  .service('SyncService', function ($rootScope, RouterService, $firebase, AppConfig, ShortIdGenerator) {

    var firebase;
    var rootInstanceId;
    var routerReport;
    var syncInstanceId = ShortIdGenerator.generate();


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
      var message = child.snapshot.value;
      var originSyncInstance = message._syncInstanceId;
      delete message._syncInstanceId;
      if (originSyncInstance != syncInstanceId) {
        RouterService.report({
          message: message,
          sourceId: 'sync-service'
        })
      }
    };

    var buffer = {};

    var persist = function (data) {
      if (!data.id) {
        console.error('persisting data not containing id', data);
      }

      buffer[data.id] = data;

      upstreamData();

    };

    var upstreamData = _.throttle(function () {
      _.forEach(buffer, function (value, key) {
        if (!value._syncInstanceId) {
          value._syncInstanceId = syncInstanceId;
        }
        var child = firebase.$child(key);
        child.$set(value);
      });
      buffer = {};
    }, AppConfig.firebase.upstreamMinIntervalMilliseconds);

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
