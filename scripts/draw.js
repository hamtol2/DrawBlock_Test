// main.
(function start() {
    
    // set block and array.
    addBlock(new Block('eventIcon', 60 + 10, 60, 60, 60));
    addBlock(new Block('hearingIcon', 60 + 10, 60 * 2 + 10, 60, 60, true));
    addBlock(new Block('ifIcon', 60 + 10, 60 * 3 + 10 * 2, 60, 60));

    // first draw.
    repaint(logicBlocks);

    // mouse event binding.
    canvas.onmousedown = onmousedown;
    canvas.onmouseup = onmouseup;
    canvas.onmouseout = onmouseup;
    canvas.onmousemove = onmousemove;
    
})();