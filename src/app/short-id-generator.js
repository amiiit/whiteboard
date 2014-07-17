angular.module('nuBoard')
  .service('ShortIdGenerator', function (UUID) {

    this.generate = function () {
      return UUID.generate().replace(/\-/g,'').substring(0,6);
    }
  });
