angular.module('nuBoard')
  .factory('KineticShapeCache', function ($cacheFactory) {
    return {
      getCache: function (name) {
        return $cacheFactory('kinetic-shape-cache-' + name);
      }
    }
  });