'use strict';

angular.module('vxlbrd')
  .directive('vxlbrd', ['Logger', function(Logger) {
    return {
      restrict: 'EA',
      templateUrl: 'app/voxelboard/vxlbrdDirective.tpl.html',
      replace: false,
      scope: { config: '=', vxlbrdData: '=', name: '@name' },
      link: function(scope, element, attrs) {

        // make vxlbrdCtrl accessible to surrounding environment
        if (scope.name) {
          scope.$parent[scope.name] = scope.vxlbrdCtrl;
        }

        // instance object
        var instance = scope.instance = {
          config: {}
        };

        // evaluate config attribute and set defaults
        if (scope.config) {
          instance.config.width = scope.config.width || 800;
          instance.config.height = scope.config.height || 600;
        }

        // create a stage and a layer
        var stage = new Kinetic.Stage({
          container: 'vxlbrd-stage',
          width: instance.config.width,
          height: instance.config.height
        });
        var layer = new Kinetic.Layer();
        stage.add(layer);
      },
      controllerAs: 'vxlbrdCtrl',
      controller: ['$scope', '$element', function($scope, $element) {


      }]
    };
  }]);
