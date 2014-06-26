describe('surface-directive', function () {

  var element;
  var scope;

  beforeEach(module('nuBoard'));

  beforeEach(inject(function ($compile, $rootScope) {
    scope = $rootScope;
    element = angular.element("<nu-surface></nu-surface>");
    $compile(element)($rootScope);
//    scope.$rootScope();
  }));

  it('element refers to kinetic', function () {
    expect(true).toBe(true);
  })

});