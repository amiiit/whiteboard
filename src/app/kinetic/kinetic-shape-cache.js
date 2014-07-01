angular.module('nuBoard')
  .factory('KineticShapeCache', function ($cacheFactory) {
    return $cacheFactory('kinetic-shape-cache');
  });