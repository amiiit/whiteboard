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
    };

    var prepareDataToSync = function (data) {
      var result = angular.copy(data);
      return result;
    };

    this.draw = function (data) {
      var child = firebase.$child(data.shapeId);
      child.$set(data);
    };

    this.newShape = function (data) {
      var child = firebase.$child(data.shapeId);
      console.log('child',child);
      child.$set(data);
    };


  })
;