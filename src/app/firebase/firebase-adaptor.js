'use strict';

angular.module('nuBoard')
  .service('FirebaseService', function (AppConfig, $firebase) {

    var firebase = new Firebase(
        AppConfig.firebase.baseUrl + '/'
        + AppConfig.firebase.appNamespace
    );

    this.draw = function (data) {

    };

    this.newShape = function (data) {

    };


  })
;