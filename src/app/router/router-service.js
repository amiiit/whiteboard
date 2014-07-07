'use strict';

angular.module('nuBoard')
  .service('RouterService', function (AppConfig) {

    var registeredInstances = {};
    var syncActive = AppConfig.syncActive;

    this.report = function (data) {
      console.log('incoming data from', data.sourceId, data.message);
      broadcastExcept(data.message, data.sourceId);
    };

    var broadcastExcept = function (message, sourceIdToSkip) {
      _.forEach(Object.keys(registeredInstances), function (instanceId) {
        if (instanceId !== sourceIdToSkip) {
          console.log('reporting to ', instanceId);
          registeredInstances[instanceId].callback(message);
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
      console.log('registering ', registerCmd.instanceId);
      console.log('registered instances', Object.keys(registeredInstances));
    };

  });
