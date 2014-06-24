'use strict';

angular.module('nuBoard', [])

    .constant('AppConfig', {
        defaultToolset: {
            tool: 'pen',
            color: 'green',
            width: 5,
            lineCap: 'round',
            lineJoin: 'round'
        }
    })

    .run(['Logger', function (Logger) {
        // init Logger
        Logger.setLevel(Logger.LOG);
    }])

    .controller('MainCtrl', function ($scope) {

    });