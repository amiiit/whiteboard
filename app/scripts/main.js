(function () {
    // create a stage and a layer
    var stage = new Kinetic.Stage({
        container: 'drawing-area',
        width: 700,
        height: 500
    });
    var layer = new Kinetic.Layer();
    stage.add(layer);

    // an empty stage does not emit mouse-events
    // so fill the stage with a background rectangle
    // that can emit mouse-events
    var background = new Kinetic.Rect({
        x: 0,
        y: 0,
        width: stage.getWidth(),
        height: stage.getHeight(),
        fill: 'skyblue',
        stroke: 'black',
        strokeWidth: 1
    });
    layer.add(background);
    layer.draw();

    // a flag we use to see if we're dragging the mouse
    var isMouseDown = false;
    // a reference to the line we are currently drawing
    var newline;
    // a reference to the array of points making newline
    var points = [];

    // on the background
    // listen for mousedown, mouseup and mousemove events
    background.on('mousedown', function () {
        onMousedown();
    });
    background.on('mouseup', function () {
        onMouseup();
    });
    background.on('mousemove', function () {
        onMousemove();
    });

    // On mousedown
    // Set the isMouseDown flag to true
    // Create a new line,
    // Clear the points array for new points
    // set newline reference to the newly created line
    function onMousedown(event) {
        isMouseDown = true;
        points = [];
        points.push(stage.getPointerPosition().x);
        points.push(stage.getPointerPosition().y);
        var line = new Kinetic.Line({
            points: points,
            stroke: "green",
            strokeWidth: 5,
            lineCap: 'round',
            lineJoin: 'round'
        });
        layer.add(line);
        newline = line;
    }

    // on mouseup end the line by clearing the isMouseDown flag
    function onMouseup(event) {
        isMouseDown = false;
    }

    // on mousemove
    // Add the current mouse position to the points[] array
    // Update newline to include all points in points[]
    // and redraw the layer
    function onMousemove(event) {
        if (!isMouseDown) {
            return;
        }
        points.push(stage.getPointerPosition().x);
        points.push(stage.getPointerPosition().y);
        newline.setPoints(points);
        stage.draw();
    }
}());