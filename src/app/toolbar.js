'use strict';

angular.module('nuBoard')
    .controller('ToolbarController', function ($scope, ToolbarService) {

        $scope.menu = {
            tools: [
                {
                    id: 'stylus',
                    options: [
                        {id: 'pen'}
                    ]
                },
                {
                    id: 'color',
                    options: [
                        {id: 'green'},
                        {id: 'skyblue'},
                        {id: 'red'},
                        {id: 'white'}
                    ]
                },
                {
                    id: 'thickness',
                    options: [
                        {id: '1'},
                        {id: '2'},
                        {id: '5'},
                        {id: '10'}
                    ]
                }
            ]
        };

        $scope.selected

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
            controller: 'ToolbarController'
        }
    })
    .service('ToolbarService', function (AppConfig) {

        var state = AppConfig.defaultToolset;

        this.getState = function () {
            var result = {};
            angular.forEach(state, function (value, key) {
                if (value.value){
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