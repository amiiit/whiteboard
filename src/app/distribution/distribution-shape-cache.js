angular.module('nuBoard')
  .factory('DistributionShapeCache', function ($cacheFactory) {
    return $cacheFactory('distribution-shape-cache');
  });