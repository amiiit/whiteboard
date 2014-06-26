'use strict';

angular.module('nuBoard')
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
    };

  });