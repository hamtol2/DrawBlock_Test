function onMouseDown(e) {
    var mouseX = e.pageX - this.offsetLeft;
    var mouseY = e.pageY - this.offsetTop;

    checkIfDraggable(logicBlocks, mouseX, mouseY);
}

function onMouseUp(e) {
    
    var checkValue = checkShouldRepaint(logicBlocks);
    
    if (checkValue.shouldDrawLine === true) {    // check if draw line.
        
        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;

        var startPos = checkValue.block.state.drawInfo.startPos;
        // current block redraw.
        resetCanvas();
        repaint(logicBlocks);

        for (var ix in logicBlocks) {
            var pointInFlowResult = pointInFlow(logicBlocks[ix], mouseX, mouseY);
    
            if (pointInFlowResult.state === true) {
                var endPos = pointInFlowResult.startPos;
                drawLine(startPos, endPos);
            }
        }
    }
    
    setAllNotDraggble(logicBlocks);
}

function onMouseMove(e) {

    var checkValue = checkShouldRepaint(logicBlocks);

    if (checkValue.shouldPaint === true) {      // check if repaint for block.

        // move block.
        checkValue.block.currentX = e.pageX - this.offsetLeft;
        checkValue.block.currentY = e.pageY - this.offsetTop;

        // current block redraw.
        resetCanvas();
        repaint(logicBlocks);
        
    } else if (checkValue.shouldDrawLine === true) {    // check if draw line.
        
        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;

        var startPos = checkValue.block.state.drawInfo.startPos;
        var endPos = { x : mouseX, y : mouseY };

        // current block redraw.
        resetCanvas();
        repaint(logicBlocks);

        // line draw.
        drawLine(startPos, endPos);
    }
}