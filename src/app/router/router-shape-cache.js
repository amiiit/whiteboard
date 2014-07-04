angular.module('nuBoard')
  .factory('RouterShapeCache', function ($cacheFactory) {
    return $cacheFactory('router-shape-cache');
  });