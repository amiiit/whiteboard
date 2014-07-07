'use strict';

angular.module('nuBoard')
  .service('FirebaseService', function (AppConfig, $firebase) {

    var firebase;
    var rootInstanceId;

    this.syncWithRootInstanceId = function (_rootInstanceId) {
      rootInstanceId = _rootInstanceId;
      firebase = $firebase(new Firebase(
          AppConfig.firebase.baseUrl + '/'
          + AppConfig.firebase.appNamespace + '/'
          + _rootInstanceId
      ));
    };



    this.draw = function (data) {
      var child = firebase.$child(data.shapeId);
      child.$set(prepareDataToSync(data));
    };

    this.newShape = function (data) {
      var child = firebase.$child(data.shapeId);
      child.$set(prepareDataToSync(data));
    };


  })
;