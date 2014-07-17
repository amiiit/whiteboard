angular.module('nuBoard')
  .service('UserService', function (ShortIdGenerator) {

    var id = undefined;

    this.id = function () {
      if (!id) {
        id = ShortIdGenerator.generate();
      }
      return id;
    }

  });
