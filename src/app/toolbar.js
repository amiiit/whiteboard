'use strict';

angular.module('nuBoard')
    .service('ToolbarService', function (AppConfig) {

        var state = AppConfig.defaultToolset;

        this.getState = function(){
            return angular.copy(state);
        }

    });