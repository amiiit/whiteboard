'use strict';

angular.module('nuBoard', ['firebase', 'ngRoute'])

  .constant('AppConfig', {
    defaultToolset: {
      stylus: {id: 'line', value: 'line'},
      color: {id: 'skyblue', value: 'skyblue'},
      width: {id: '5', value: 5},
      lineCap: {id: 'round', value: 'round'},
      lineJoin: {id: 'round', value: 'round'},
      followAction: {active: true}
    },
    firebase: {
      baseUrl: 'https://fiery-fire-1095.firebaseio.com',
      appNamespace: 'nuBoard',
      upstreamMinIntervalMilliseconds: 200
    },
    syncActive: true
  })

  .run(['Logger', function (Logger) {
    // init Logger
    Logger.setLevel(Logger.LOG);
  }])

  .config(function ($routeProvider) {
    $routeProvider
      .when('/new-board', {
        controller: 'NewBoardCtrl',
        template: '<pre>redirect to new board</pre>'
      })
      .when('/:boardId', {
        controller: 'MainCtrl',
        templateUrl: 'app/app.tpl.html'
      })
      .otherwise({
        redirectTo: '/new-board'
      })
  })

  .controller('MainCtrl', function ($scope, $routeParams, $rootScope, SyncService, AppConfig, SurfaceService, UserService) {

    if (AppConfig.syncActive) {
      SyncService.init();
    }
    SurfaceService.init();
    $rootScope.boardId = $routeParams.boardId;
    $rootScope.userId = UserService.id();
    $scope.shapes = {}; //todo: move this to surface
    $scope.focus = {x: 0.5, y: 0.5};
    $scope.surfaceWidth = 2000;
    $scope.surfaceHeight = 2000;
    $scope.minimapWidth = 200;
    $scope.minimapHeight = 200;
    $scope.minimapZoomScale = 0.1;
    $scope.surfacePositionOffset = {};
  })

  .controller('NewBoardCtrl', function ($scope, $location, ShortIdGenerator) {
    var newBoardId = ShortIdGenerator.generate();
    $location.path('/' + newBoardId);

  });
