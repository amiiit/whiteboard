angular.module('nuBoard')
  .factory('KineticShapeFactory', function () {

    var typeToConstructor = {
      'line': Kinetic.Line
    };

    return {
      fromType: function (type) {
        return new typeToConstructor[type];
      },
      fromTypeAndConfig: function (data) {
        var type = data.type;
        delete data.type;

        if (!data.points && data.position) {
          data.points = [data.position.x, data.position.y];
        }

        return new typeToConstructor[type](data);
      }
    }

  });