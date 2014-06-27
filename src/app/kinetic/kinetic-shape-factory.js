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
          delete data.position;
        }

        if (data.localOrigin) {
          delete data.localOrigin;
        }

        if (data.shapeId) {
          delete data.shapeId;
        }

        return new typeToConstructor[type](data);

      }
    }

  });