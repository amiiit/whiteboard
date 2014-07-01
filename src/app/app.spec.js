/**
 * Tests sit right alongside the file they are testing, which is more intuitive
 * and portable than separating `src` and `test` directories. Additionally, the
 * build process will exclude all `.spec.js` files from the build
 * automatically.
 */
describe('app', function () {

  var AppConfig;

  beforeEach(module('nuBoard'));

  it('should have a dummy test', (function () {
    expect(true).toBeTruthy();
  }));

  it('config sets a color', function(){
    inject(function(_AppConfig_){
      AppConfig = _AppConfig_;
    });
    expect(!!AppConfig.defaultToolset.color.value).toBe(true);
    expect(!!AppConfig.defaultToolset.color.id).toBe(true)
  })

});
