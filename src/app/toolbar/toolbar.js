'use strict';

angular.module('nuBoard')
  .controller('ToolbarController', function ($scope, ToolbarService) {

    $scope.selected = {};

    $scope.menu = {
      tools: [
        {
          id: 'stylus',
          options: [
            {id: 'pen', logoId: 'pencil'}
          ]
        },
        {
          id: 'color',
          options: [
            {id: 'green', logoId: 'circle', value: 'green'},
            {id: 'skyblue', logoId: 'circle', value: 'skyblue'},
            {id: 'red', logoId: 'circle', value: 'red'},
            {id: 'white', logoId: 'circle', value: 'white'}
          ]
        },
        {
          id: 'width',
          options: [
            {id: '10', value: 10},
            {id: '5', value: 5},
            {id: '2', value: 2},
            {id: '1', value: 1}
          ]
        }
      ]
    };

    $scope.$watch('menu', function () {
        ToolbarService.updateState(angular.copy($scope.menu));
        $scope.selected = ToolbarService.getState();
      }, true
    );

    $scope.pickTool = function (tool, option) {
      angular.forEach(tool.options, function (anyOption) {
        delete anyOption.selected
      });
      option.selected = true;
    };
  })

  .directive('nuToolbar', function () {

    return {
      restrict: 'E',
      templateUrl: 'app/toolbar/toolbar.tpl.html',
      controller: 'ToolbarController',
      replace: true
    }

  });
