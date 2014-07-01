'use strict';

angular.module('nuBoard')
  .service('SyncService', function (FirebaseService, $rootScope) {

    $rootScope.$watch('boardId', function (newBoardId) {
      FirebaseService.syncWithBoardId(newBoardId);
    });

    FirebaseService.setHandler('new_shape', function (data) {
      angular.forEach(handlers['new_shape'], function (handler) {
        handler(data);
      });
    });

    FirebaseService.setHandler('amended_shape', function (data) {
      angular.forEach(handlers['amended_shape'], function (handler) {
        handler(data);
      });
    });

    var handlers = {};

    this.setHandler = function (event, handler) {
      if (!handlers[event]) {
        handlers[event] = [];
      }
      handlers[event].push(handler);
    };


    var prepareDataToSync = function (data) {
      var result = angular.copy(data);
      delete result.localOrigin;
      return result;
    };

    this.draw = function (data) {
      FirebaseService.draw(prepareDataToSync(data));
    };
    this.newShape = function (data) {
      FirebaseService.newShape(prepareDataToSync(data));
    };
  })
;