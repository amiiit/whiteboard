'use strict';

angular.module('nuBoard')
    .controller('ToolbarController', function ($scope, ToolbarService) {

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
                        {id: '1', value: 1},
                        {id: '2', value: 2},
                        {id: '5', value: 5},
                        {id: '10', value: 10}
                    ]
                }
            ]
        };

        $scope.$watch('menu', function () {
                ToolbarService.updateState(angular.copy($scope.menu));
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
            templateUrl: 'app/toolbar.tpl.html',
            controller: 'ToolbarController',
            replace: true
        }
    })
    .service('ToolbarService', function (AppConfig) {

        var state = AppConfig.defaultToolset;

        this.getState = function () {
            var result = {};
            angular.forEach(state, function (value, key) {
                if (value.value) {
                    result[key] = value.value;
                } else {
                    result[key] = value.id;
                }
            });
            return result;
        };

        this.updateState = function (menu) {
            angular.forEach(menu.tools, function (menuTool) {
                angular.forEach(menuTool.options, function (toolOption) {
                    if (toolOption.selected) {
                        state[menuTool.id] = toolOption;
                    }
                })
            });
            console.log('toolbar service state updated', state);
        };

    });