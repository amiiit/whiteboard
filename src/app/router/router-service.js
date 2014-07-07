'use strict';

angular.module('nuBoard')
  .service('RouterService', function (AppConfig, $q) {

    var registeredInstances = {};

    this.report = function (data) {
      broadcastExcept(data.message, data.sourceId);
    };

    var broadcastExcept = function (message, sourceIdToSkip) {
      _.forEach(Object.keys(registeredInstances), function (instanceId) {
        if (instanceId !== sourceIdToSkip) {
          (function () {
          registeredInstances[instanceId].callback(message);
          })();
        }
      })
    };

    /**
     * Register instance to be able to receive data posted by other
     * instances
     * @param registerCmd - {instanceId: <your-instance-id>,
     * callback: <invoked to report your-instance with new data >}
     */
    this.register = function (registerCmd) {
      registeredInstances[registerCmd.instanceId] = {
        callback: registerCmd.callback
      };
    };

  });
