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


        var workData = angular.copy(data);

        var type = workData.type;
        delete workData.type;

        workData.strokeWidth = data.width;

        if (workData.localOrigin) {
          delete workData.localOrigin;
        }

        if (workData.shapeId) {
          delete workData.shapeId;
        }

        workData.stroke = workData.color;
        delete workData.color;

        return new typeToConstructor[type](workData);

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