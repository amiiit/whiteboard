angular.module('nuBoard')
  .service('BoardUtils', function () {

    //http://andylangton.co.uk/blog/development/get-viewport-size-width-and-height-javascript
    this.viewport = function () {
      var e = window
        , a = 'inner';
      if (!( 'innerWidth' in window )) {
        a = 'client';
        e = document.documentElement || document.body;
      }
      return { width: e[ a + 'Width' ], height: e[ a + 'Height' ] }
    }
  });