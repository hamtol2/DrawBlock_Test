function onMouseDown(e) {
    var mouseX = e.pageX - this.offsetLeft;
    var mouseY = e.pageY - this.offsetTop;

    checkIfDraggable(logicBlocks, mouseX, mouseY);
}

function onMouseUp(e) {
    setAllNotDraggble(logicBlocks);
}

function onMouseMove(e) {

    var checkValue = checkShouldRepaint(logicBlocks);

    if (checkValue.shouldPaint === true) {

        checkValue.block.currentX = e.pageX - this.offsetLeft;
        checkValue.block.currentY = e.pageY - this.offsetTop;

        resetCanvas();
        repaint(logicBlocks);
    } else {
        // check if draw line.
    }
}