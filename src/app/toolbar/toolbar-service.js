'use strict';

angular.module('nuBoard')
  .service('ToolbarService', function (AppConfig) {

    var state = AppConfig.defaultToolset;

    this.getState = function () {
      var result = {};
      angular.forEach(state, function (value, key) {
        if (value.value) {
          result[key] = value.value;
        } else if (value.active) {
          result[key] = true
        } else {
          result[key] = value.id;
        }
      });
      return result;
    };

    this.updateState = function (menu) {
      console.log('updating state menu', menu);
      angular.forEach(menu.tools, function (menuTool) {
        if (menuTool.options) {
          angular.forEach(menuTool.options, function (toolOption) {
            if (toolOption.selected) {
              state[menuTool.id] = toolOption;
            }
          })
        } else if (menuTool.active != undefined) {
          state[menuTool.id].active = menuTool.active
        } else {
          console.warn('no state for tool found');
        }
      });
    };

  });
