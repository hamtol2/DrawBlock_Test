function onmousedown(e) {
    var mouseX = e.pageX - this.offsetLeft;
    var mouseY = e.pageY - this.offsetTop;

    checkIfDraggable(logicBlocks, mouseX, mouseY);
}

function onmouseup(e) {
    setAllNotDraggble(logicBlocks);
}

function onmousemove(e) {

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