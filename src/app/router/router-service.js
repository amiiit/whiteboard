'use strict';

angular.module('nuBoard')
  .service('RouterService', function (AppConfig) {

    var registeredInstances = {};
    var syncActive = AppConfig.syncActive;

    this.report = function (data) {
      broadcastExcept(data, data.sourceId);
    };

    var broadcastExcept = function (data, sourceIdToSkip) {
      _.forEach(Object.keys(registeredInstances), function (instanceId) {
        if (instanceId !== sourceIdToSkip) {
          registeredInstances[instanceId].callback(data);
        } else {
          console.log('skipping instance', instanceId);
        }
      })
    };

    this.register = function (registerCmd) {
      registeredInstances[registerCmd.instanceId] = {
        callback: registerCmd.callback
      };
    };

  });
