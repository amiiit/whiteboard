'use strict';

describe('Kinetic shape factory', function () {

  var factory;

  beforeEach(module('nuBoard'));

  beforeEach(inject(function (_KineticShapeFactory_) {
    factory = _KineticShapeFactory_;
  }));

  it('from type', function () {
    var line = factory.fromType('line');
    expect(line instanceof Kinetic.Line).toBe(true);
  });

  it('from type and config', function () {
    var line = factory.fromTypeAndConfig({
      type: 'line',
      points: [50, 50],
      stroke: 'green',
      strokeWidth: 5,
      lineCap: 'round',
      lineJoin: 'round'
    });
    expect(line instanceof Kinetic.Line).toBe(true);
    expect(line.points()).toEqual([50, 50]);
  });

  it('factory translates property names', function () {
    var line = factory.fromTypeAndConfig({
      type: 'line',
      position: {x: 50, y: 50},
      color: 'green',
      strokeWidth: 5,
      lineCap: 'round',
      lineJoin: 'round'
    });

    expect(line instanceof Kinetic.Line).toBe(true);
    expect(line.attrs.stroke).toEqual('green');
  });

});