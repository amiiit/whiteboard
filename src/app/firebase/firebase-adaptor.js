'use strict';

angular.module('nuBoard')
  .service('FirebaseService', function (AppConfig, $firebase) {

    var firebase;
    var boardId;

    this.syncWithBoardId = function (_boardId) {
      boardId = _boardId;
      firebase = $firebase(new Firebase(
          AppConfig.firebase.baseUrl + '/'
          + AppConfig.firebase.appNamespace + '/'
          + _boardId
      ));

      firebase.$on('child_added', function (a) {
        angular.forEach(handlers['new_shape'], function (handler) {
          handler(a.snapshot.value);
        });
      });

      firebase.$on('child_changed', function (a) {
        angular.forEach(handlers['amended_shape'], function (handler) {
          handler(a.snapshot.value);
        });
      });

    };

    var handlers = {};

    this.setHandler = function (event, handler) {
      if (!handlers[event]) {
        handlers[event] = [];
      }
      handlers[event].push(handler);
    };

    var prepareDataToSync = function (data) {
      return angular.copy(data);
    };

    this.draw = function (data) {
      var child = firebase.$child(data.shapeId);
      child.$set(prepareDataToSync(data));
    };

    this.newShape = function (data) {
      var child = firebase.$child(data.shapeId);
      console.log('child', child);
      child.$set(prepareDataToSync(data));
    };


  })
;