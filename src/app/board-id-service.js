angular.module('nuBoard')
  .service('BoardIdService', function (UUID) {

    this.generate = function () {
      return UUID.generate().replace(/\-/g,'').substring(0,6);
    }
  });