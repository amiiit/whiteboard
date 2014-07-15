angular.module('nuBoard')
  .service('Viewport', function () {

    //http://andylangton.co.uk/blog/development/get-viewport-size-width-and-height-javascript
    this.dimensions = function () {
      var e = window
        , a = 'inner';
      if (!( 'innerWidth' in window )) {
        a = 'client';
        e = document.documentElement || document.body;
      }
      return { width: e[ a + 'Width' ], height: e[ a + 'Height' ] }
    }
  });
