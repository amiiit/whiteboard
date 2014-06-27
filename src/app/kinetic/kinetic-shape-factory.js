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

        data.strokeWidth = 5;
        delete data.width;

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

        data.stroke = data.color;
        delete data.color;

        return new typeToConstructor[type](data);

      },
      stage: function (data) {
        return new Kinetic.Stage({
          container: data.container || data.id,
          width: data.width,
          height: data.height
        })
      },
      layer: function(){
        return new Kinetic.Layer();
      }

    }

  });